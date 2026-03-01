import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';
import { passwordResetTemplate } from '../emails/templates/passwordReset.js';
import { registerVerificationTemplate } from "../emails/templates/registerVerificationTemplate.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Create token and send in cookie
const sendToken = (user, statusCode, res, isAdminImpersonating = false) => {
  const token = jwt.sign({ id: user._id, isAdminImpersonating }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set true in production with HTTPS
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(statusCode).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
      isImpersonating: isAdminImpersonating
    }
  });
};


// @desc Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if already verified
    const verifiedUser = await User.findOne({ email, isVerified: true });
    if (verifiedUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 2. Generate 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const logoUrl = `${process.env.CLIENT_URL}/logo.png`;

    let user;

    // 3. If unverified user exists → update code
    const unverifiedUser = await User.findOne({ email, isVerified: false });
    if (unverifiedUser) {
      unverifiedUser.verificationCode = verificationCode;
      unverifiedUser.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 min expiry
      await unverifiedUser.save();
      user = unverifiedUser;
    } else {
      // 4. Create new user
      user = await User.create({
        name,
        email,
        password,
        role: "user",
        isVerified: false,
        verificationCode,
        verificationCodeExpire: Date.now() + 10 * 60 * 1000, // 10 min expiry
      });
    }

    // 5. Send email
    const emailHtml = registerVerificationTemplate(user.name, verificationCode, logoUrl);
    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      html: emailHtml,
    });

    res.status(201).json({
      success: true,
      user: user,
      message: unverifiedUser
        ? "Verification code resent to your email."
        : "User registered. Verification code sent to email.",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ✅ Verify code
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid code" });

    // check expiry
    if (user.verificationCodeExpire < Date.now()) {
      return res.status(400).json({ message: "Code expired" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    // await user.save();
    await user.save({ validateBeforeSave: false });

    console.log(user);

    sendToken(user, 200, res);
    // res.json({ message: "Email verified successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", err: err });
  }
};

// ✅ Resend code
export const resendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // generate new code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // send email
    await sendEmail({
      to: email,
      subject: "Resend Email Verification",
      html: registerVerificationTemplate(user.name, verificationCode),
    });

    res.json({ message: "Verification code resent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// @desc Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Logout
export const logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logged out" });
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,      // <--- Set googleId here
        provider: 'google',
        profilePicture: payload.picture,
        role: 'user',            // or your default role
      });

      await user.save();
    } else if (!user.googleId) {
      // Update existing user if they don't have googleId yet (optional)
      user.googleId = payload.sub;
      user.provider = 'google';
      user.profilePicture = payload.picture;
      await user.save();
    }


    sendToken(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Google login failed' });
  }
};



// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save hashed token & expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save({ validateBeforeSave: false });


    // Create reset URL (frontend should have route /reset-password/:token)
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    // console.log(resetURL , 'resetURL');

    const logoUrl = `${process.env.CLIENT_URL}/logo.png`;

    const message = passwordResetTemplate(user.name, resetURL, logoUrl);

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: message
    });

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    next(err);
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, c_password } = req.body;

    if (!token) return res.status(400).json({ message: 'Token missing' });
    if (!password) return res.status(400).json({ message: 'Password required' });
    if (!c_password) return res.status(400).json({ message: 'Confirm Password required' });

    if (password !== c_password) {
      return res.status(400).json({ message: "Passwords do not match, Please try again!" });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = password; // pre-save hook will hash
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: '  reset successful' });
  } catch (err) {
    next(err);
  }
};


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Impersonate User
export const impersonateUser = async (req, res) => {
  try {
    const userToImpersonate = await User.findById(req.params.id);

    if (!userToImpersonate) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Store the admin's original token in a separate cookie
    const adminToken = req.cookies.token;
    res.cookie("admin_token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    // Send the new token for the impersonated user
    sendToken(userToImpersonate, 200, res, true);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Stop Impersonating
export const stopImpersonating = async (req, res) => {
  try {
    const adminToken = req.cookies.admin_token;

    if (!adminToken) {
      return res.status(400).json({ success: false, message: "No admin session found" });
    }

    // Restore the admin token
    res.cookie("token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    // Clear the admin_token cookie
    res.clearCookie("admin_token");

    // Verify and decode the admin token to get user info
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    const adminUser = await User.findById(decoded.id);

    if (!adminUser) {
      return res.status(404).json({ success: false, message: "Admin user not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        token: adminToken,
        isImpersonating: false
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
