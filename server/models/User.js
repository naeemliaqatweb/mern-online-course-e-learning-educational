import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Only required if no Google ID
      },
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          if (!value) return true; // skip validation if using Google login
          // Regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    googleId: { type: String, default: null }, // Store Google account ID
    role: { type: String, required: true },
    profilePicture: { type: String, default: null },
    provider: { type: String, default: null }, // e.g., 'google'

    // 🔹 Subscription Fields
    currentPlan: {
      type: String,
      enum: ['free', 'advance', 'premium', null],
      default: null
    },
    planExpiryDate: { type: Date, default: null },
    billingType: { type: String, enum: ['monthly', 'yearly', null], default: null },
    planStartDate: { type: Date, default: null },

    // 🔹 Email Verification Fields
    verificationCode: { type: String, default: null },

    isVerified: {
      type: Boolean,
      default: function () {
        return this.googleId ? true : false;
        // Google users auto-verified
      },
    },
    verificationCodeExpire: {
      type: Date,
      default: null,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);


// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
