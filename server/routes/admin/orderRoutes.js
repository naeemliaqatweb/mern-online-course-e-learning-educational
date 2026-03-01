import express from "express";
import {
     createCheckoutSession, stripeWebhook, getOrderBySession,
     getOrders, getDeletedOrders, getUserOrders, getTotalOrders, updateOrder, softDeleteOrder, permanentDeleteOrder
} from "../../controllers/admin/orderController.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

// Stripe webhook (⚠️ raw body required)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

router.get("/success", getOrderBySession);

router.get("/get", getOrders);
router.get("/get-deleted", getDeletedOrders);
router.get("/get-total", getTotalOrders);
router.put("/update-status", updateOrder);
router.put("/soft-delete/:id", softDeleteOrder);
router.delete("/permanent-delete/:id", permanentDeleteOrder);


router.get("/:userId", getUserOrders);



export default router;
