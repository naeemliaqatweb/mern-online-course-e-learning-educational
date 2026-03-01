import express from "express";
import { getPublishedCourses, getCourseDetails, getAllowedCourses } from "../controllers/courseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPublishedCourses);
router.get("/my-courses", protect, getAllowedCourses);
router.get("/:id", getCourseDetails);

export default router;
