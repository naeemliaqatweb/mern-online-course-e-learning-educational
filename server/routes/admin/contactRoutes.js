import express from "express";
import { getContact, saveContact } from "../../controllers/admin/contactController.js";

const router = express.Router();

router.get("/", getContact);     // GET /api/contact
router.post("/", saveContact);   // POST /api/contact

export default router;
