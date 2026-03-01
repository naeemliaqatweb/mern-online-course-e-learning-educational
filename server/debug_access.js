import mongoose from 'mongoose';
import User from './models/User.js';
import Order from './models/Order.js';
import Plan from './models/Plan.js';
import dotenv from 'dotenv';

dotenv.config();

const checkStatus = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const userId = '689793f897505b02d16fef09'; // User ID from user message

        const user = await User.findById(userId);
        console.log('User:', user);

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        console.log('Orders:', orders);

        if (orders.length > 0) {
            const plan = await Plan.findById(orders[0].planId);
            console.log('Latest Order Plan:', plan);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkStatus();
