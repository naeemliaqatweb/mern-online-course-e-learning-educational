import Stripe from "stripe";
import Order from "../../models/Order.js";
import Plan from "../../models/Plan.js";
import User from "../../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

// ✅ Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { planId, PlanName, billingCycle, amount, userId } = req.body;

    // Clean up any existing pending orders for this user and plan
    await Order.deleteMany({ userId, planId, status: "pending" });

    // Create a new pending order
    const order = await Order.create({
      userId,
      planId,
      PlanName,
      billingCycle,
      amount,
      status: "pending",
    });

    // Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Plan ${billingCycle}`,
            },
            unit_amount: amount * 100, // convert to cents
            recurring: {
              interval: billingCycle === "monthly" ? "month" : "year",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: { orderId: order._id.toString() },
    });

    // Save Stripe session ID in order
    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // req.body is raw because of express.raw middleware
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const orderId = session.metadata?.orderId;
      if (orderId) {
        const order = await Order.findByIdAndUpdate(
          orderId,
          {
            status: "completed",
            stripeSubscriptionId: session.subscription,
          },
          { new: true }
        );

        if (order?.planId) {
          const plan = await Plan.findByIdAndUpdate(order.planId, { $inc: { subscribers: 1 } });
          console.log(`✅ Incremented subscribers for plan: ${order.planId}`);

          // Update User Subscription
          if (order.userId && plan) {
            const expiryDate = new Date();
            if (order.billingCycle === 'monthly') {
              expiryDate.setDate(expiryDate.getDate() + 30);
            } else if (order.billingCycle === 'yearly') {
              expiryDate.setDate(expiryDate.getDate() + 365);
            }

            await User.findByIdAndUpdate(order.userId, {
              currentPlan: plan.level || 'free',
              planExpiryDate: expiryDate,
              billingType: order.billingCycle,
              planStartDate: new Date()
            });
            console.log(`✅ Updated user ${order.userId} subscription to ${plan.level}`);
          }
        }
      }
    }
  } catch (err) {
    console.error("⚠️ Failed to update order:", err);
  }

  res.json({ received: true });
};


// ✅ Get order info by Stripe session
export const getOrderBySession = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription"],
    });

    // 1. Try finding by metadata orderId first (most reliable)
    const orderId = session.metadata?.orderId;
    let order;

    if (orderId) {
      order = await Order.findById(orderId).populate("planId");
    }

    // 2. Fallback to searching by stripeSessionId if metadata lookup fails
    if (!order) {
      order = await Order.findOne({ stripeSessionId: session.id }).populate("planId");
    }

    if (!order) {
      console.error(`❌ Order not found for session ${session.id}`);
      return res.status(404).json({ error: "Order not found. If you just paid, please wait a moment and refresh." });
    }

    // 🔹 Fallback: If payment is successful but order is still pending (Webhook failed?)
    if ((session.payment_status === 'paid' || session.payment_status === 'no_payment_required') && order.status === 'pending') {
      console.log(`⚠️ Webhook fallback triggered for Order: ${order._id}`);

      order.status = 'completed';
      order.stripeSessionId = session.id;
      order.stripeSubscriptionId = session.subscription ? (typeof session.subscription === 'string' ? session.subscription : session.subscription.id) : null;
      await order.save();

      if (order.planId) {
        const plan = await Plan.findByIdAndUpdate(order.planId._id, { $inc: { subscribers: 1 } });

        // Update User Subscription
        if (order.userId && plan) {
          const expiryDate = new Date();
          if (order.billingCycle === 'monthly') {
            expiryDate.setDate(expiryDate.getDate() + 30);
          } else if (order.billingCycle === 'yearly') {
            expiryDate.setDate(expiryDate.getDate() + 365);
          }

          await User.findByIdAndUpdate(order.userId, {
            currentPlan: plan.level || 'free',
            planExpiryDate: expiryDate,
            billingType: order.billingCycle,
            planStartDate: new Date()
          });
          console.log(`✅ [Fallback] Updated user ${order.userId} subscription to ${plan.level}`);
        }
      }
    }

    res.json({
      orderId: order._id,
      plan: order.planId,
      amount: order.amount,
      billingCycle: order.billingCycle,
      status: order.status,
      customer_email: session.customer_details?.email || "Email not available",
    });
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};


//getOrders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isDeleted: { $ne: true } })
      .populate("userId", "name email")
      .populate("planId", "name monthly yearly")
      .sort({ createdAt: -1 });
    console.log(orders);
    res.status(200).json({
      success: true,
      orders: orders
    })

  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ error: error.message });
  }
}

// getDeletedOrders
export const getDeletedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isDeleted: true })
      .populate("userId", "name email")
      .populate("planId", "name monthly yearly")
      .sort({ deletedAt: -1 });

    res.status(200).json({
      success: true,
      orders: orders
    });

  } catch (error) {
    console.error("Get Deleted Order Error:", error);
    res.status(500).json({ error: error.message });
  }
}


//getOrders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("planId", "name monthly yearly").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders: orders
    })

  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ error: error.message });
  }
}

//getTotalOrders
export const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()
    res.status(200).json({
      success: true,
      totalOrders
    })

  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ error: error.message });
  }
}

//updateOrders
export const updateOrder = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found" });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ error: error.message });
  }
}

export const softDeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Revoke User Access
    if (order.userId) {
      await User.findByIdAndUpdate(order.userId, {
        currentPlan: 'free',
        planExpiryDate: null,
        billingType: null,
        planStartDate: null
      });
      console.log(`🚫 Revoked access for user ${order.userId} due to order deletion`);
    }

    res.status(200).json({ success: true, message: "Order moved to trash", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const permanentDeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find order first to get userId
    const orderToDelete = await Order.findById(id);
    if (!orderToDelete) return res.status(404).json({ error: "Order not found" });

    // Revoke User Access
    if (orderToDelete.userId) {
      await User.findByIdAndUpdate(orderToDelete.userId, {
        currentPlan: 'free',
        planExpiryDate: null,
        billingType: null,
        planStartDate: null
      });
      console.log(`🚫 Revoked access for user ${orderToDelete.userId} due to order deletion`);
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Order permanently deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
