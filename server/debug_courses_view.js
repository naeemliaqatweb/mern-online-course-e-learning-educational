import mongoose from 'mongoose';
import User from './models/User.js';
import Course from './models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const userId = '689793f897505b02d16fef09'; // User ID from previous context

        const user = await User.findById(userId);
        console.log('User Plan:', user.currentPlan);

        const courses = await Course.find({});
        console.log('Courses:', courses.map(c => ({ title: c.title, level: c.level, isPublished: c.isPublished })));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
