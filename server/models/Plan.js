import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthly: { type: Number, required: true },
  yearly: { type: Number, required: true },
  popular: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  subscribers: { type: Number, default: 0 },
  subscribers: { type: Number, default: 0 },
  features: { type: [String], default: [] },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  level: {
    type: String,
    enum: ['free', 'advance', 'premium'],
    default: 'free'
  },
}, { timestamps: true });

export default mongoose.model("Plan", PlanSchema);
