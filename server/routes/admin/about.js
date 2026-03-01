import express from "express";
import multer from "multer";
import {
  createAbout,
  getAllAbout,
  updateAbout,
  deleteAbout
} from "../../controllers/admin/aboutController.js";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// CRUD routes
router.post("/", upload.single("image"), createAbout);
router.get("/", getAllAbout);
router.put("/:id", upload.single("image"), updateAbout);
router.delete("/:id", deleteAbout);

export default router;
