import express from "express";
import { getPlans, createPlan, updatePlan, deletePlan } from "../../controllers/admin/adminPlanController.js";

const router = express.Router();

router.get("/", getPlans);
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
