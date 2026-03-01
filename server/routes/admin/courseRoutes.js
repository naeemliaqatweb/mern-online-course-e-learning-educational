import express from "express";
import { createCourse, getCourse, updateCourse, deleteCourse, duplicateCourse, togglePublishStatus } from "../../controllers/admin/courseController.js";

const router = express.Router();

router.post("/create", createCourse);   // POST /api/admin/courses/create

router.get("/get", getCourse);   // GET /api/admin/courses/get

router.put("/update/:id", updateCourse); // PUT /api/admin/courses/update/:id

router.delete("/delete/:id", deleteCourse); // DELETE /api/admin/courses/delete/:id

router.post("/duplicate/:id", duplicateCourse); // POST /api/admin/courses/duplicate/:id

router.put("/publish/:id", togglePublishStatus); // PUT /api/admin/courses/publish/:id

export default router;
