import Course from "../models/Course.js";
import Plan from "../models/Plan.js";
import Order from "../models/Order.js";

export const getPublishedCourses = async (req, res) => {
    try {
        console.log('Fetching published courses...');
        const courses = await Course.find({ isPublished: true }).sort({ createdAt: -1 });
        console.log(`Found ${courses.length} published courses`);
        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.error('Get published courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
};

export const getCourseDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findOne({ _id: id, isPublished: true });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Get course details error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching course details',
            error: error.message
        });
    }
};

export const getAllowedCourses = async (req, res) => {
    try {
        // 1. Find all completed orders for the user
        const orders = await Order.find({ userId: req.user._id, status: 'completed' });

        // 2. Get Plan IDs from orders
        const purchasedPlanIds = orders.map(order => order.planId);

        // 3. Find Plans (purchased plans only)
        // We removed the default 'free' level inclusion to enforce strict order-based access
        const plans = await Plan.find({
            _id: { $in: purchasedPlanIds },
            active: true
        });

        let allowedCourseIds = [];
        plans.forEach(plan => {
            allowedCourseIds = [...allowedCourseIds, ...plan.courses];
        });

        const courses = await Course.find({
            $or: [
                { _id: { $in: allowedCourseIds } },
                { level: 'free' }
            ],
            isPublished: true
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.error('Get allowed courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching allowed courses',
            error: error.message
        });
    }
};
