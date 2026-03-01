import express from "express";
import { register, login, logout, forgotPassword, resetPassword, googleLogin, getUsers, verifyCode, resendCode, impersonateUser, stopImpersonating } from "../controllers/authController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/verify-code", verifyCode);
router.post("/resend-code", resendCode);


router.post("/login", login);
router.post("/logout", logout);
router.post('/google', googleLogin);

router.get('/get-users', protect, isAdmin, getUsers);
router.post('/impersonate/:id', protect, isAdmin, impersonateUser);
router.post('/stop-impersonating', protect, stopImpersonating);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


// Example protected route
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
