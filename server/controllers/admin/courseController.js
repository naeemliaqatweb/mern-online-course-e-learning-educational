import Course from "../../models/Course.js";

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin

export const createCourse = async (req, res) => {
    try {


        const { title, description, images, tags, created_by, curriculum } = req.body;
        // Validate required fields
        if (!title || !description || !created_by) {
            return res.status(400).json({
                success: false,
                message: 'Title, description, and creator are required fields'
            });
        }

        // Simple validation for curriculum
        if (curriculum && Array.isArray(curriculum)) {
            for (let section of curriculum) {
                if (!section.section) {
                    return res.status(400).json({
                        success: false,
                        message: 'All curriculum sections must have a section name'
                    });
                }
                for (let lesson of section.lessons || []) {
                    if (!lesson.name || !lesson.title || !lesson.duration) {
                        return res.status(400).json({
                            success: false,
                            message: 'All lessons must have name, title, and duration'
                        });
                    }
                }
            }
        }

        const course = await Course.create({
            title: title.trim(),
            description: description.trim(),
            images: images || [],
            tags: tags ? tags.map(tag => tag.trim()) : [],
            created_by: created_by.trim(),
            curriculum: curriculum || [],
            // Set default values for new fields
            category: 'General',
            instructor: { name: created_by.trim() },
            price: { amount: 0, currency: 'USD' },
            difficulty: 'beginner',
            isPublished: false,
            isActive: true,
            level: req.body.level || 'free'
        });

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: course
        });

    } catch (error) {
        console.error('Create course error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating course',
            error: error.message
        });
    }
};

export const getCourse = async (req, res) => {
    try {
        const getCourse = await Course.find({});
        res.status(200).json({
            success: true,
            data: getCourse
        });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, images, tags, created_by, curriculum } = req.body;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Update fields
        course.title = title || course.title;
        course.description = description || course.description;
        course.images = images || course.images;
        course.tags = tags || course.tags;
        course.created_by = created_by || course.created_by;
        course.curriculum = curriculum || course.curriculum;
        course.level = req.body.level || course.level;

        const updatedCourse = await course.save();

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: updatedCourse
        });

    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating course',
            error: error.message
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            id: id
        });

    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting course',
            error: error.message
        });
    }
};

export const duplicateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const newCourseData = course.toObject();
        delete newCourseData._id;
        delete newCourseData.createdAt;
        delete newCourseData.updatedAt;
        delete newCourseData.__v;

        newCourseData.title = `${newCourseData.title} (Copy)`;
        newCourseData.isPublished = false; // Default to unpublished for duplicates

        const newCourse = await Course.create(newCourseData);

        res.status(201).json({
            success: true,
            message: 'Course duplicated successfully',
            data: newCourse
        });

    } catch (error) {
        console.error('Duplicate course error:', error);
        res.status(500).json({
            success: false,
            message: 'Error duplicating course',
            error: error.message
        });
    }
};

export const togglePublishStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        course.isPublished = !course.isPublished;
        const updatedCourse = await course.save();

        res.status(200).json({
            success: true,
            message: `Course ${updatedCourse.isPublished ? 'published' : 'unpublished'} successfully`,
            data: updatedCourse
        });

    } catch (error) {
        console.error('Toggle publish status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating course status',
            error: error.message
        });
    }
};