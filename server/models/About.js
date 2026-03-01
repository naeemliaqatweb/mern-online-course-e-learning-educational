import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['achievement', 'goal'],
    required: true
  }
}, {
  timestamps: true
});

// Create index for better query performance
aboutSchema.index({ type: 1, createdAt: -1 });

const About = mongoose.model('About', aboutSchema);

export default About;