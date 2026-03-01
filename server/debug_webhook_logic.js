import mongoose from 'mongoose';
import User from './models/User.js';
import Order from './models/Order.js';
import Plan from './models/Plan.js';
import dotenv from 'dotenv';

dotenv.config();

const simulateWebhook = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const orderId = '6970c037116a2a92ab6df69f'; // Order ID from previous debug output

        // 1. Simulate finding the order
        const order = await Order.findById(orderId);
        console.log('Order found:', order);

        if (!order) {
            console.log('Order not found');
            process.exit();
        }

        // 2. Simulate finding the plan
        console.log('Finding plan with ID:', order.planId);
        const plan = await Plan.findById(order.planId);
        console.log('Plan found:', plan);

        if (order.userId && plan) {
            console.log('Conditions met. Updating user...');
            const expiryDate = new Date();
            // ... logic ...

            // DRY RUN - not actually updating to preserve state for now, just checking logic
            console.log(`Would update user ${order.userId} to plan ${plan.level}`);
        } else {
            console.log('Conditions NOT met.');
            console.log('order.userId:', order.userId);
            console.log('plan:', plan);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

simulateWebhook();
