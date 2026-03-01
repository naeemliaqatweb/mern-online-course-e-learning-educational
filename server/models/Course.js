import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  video_url: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  resources: [{
    type: String
  }]
}, {
  timestamps: true
});

const curriculumSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    trim: true
  },
  lessons: [lessonSchema]
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  images: [{
    type: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  created_by: {
    type: String,
    required: [true, 'Course creator is required'],
    trim: true
  },
  curriculum: [curriculumSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  level: {
    type: String,
    enum: ['free', 'advance', 'premium'],
    default: 'free'
  },
  enrolledStudents: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total lessons count
courseSchema.virtual('totalLessons').get(function () {
  return this.curriculum.reduce((total, section) => {
    return total + section.lessons.length;
  }, 0);
});

// Virtual for total sections count
courseSchema.virtual('totalSections').get(function () {
  return this.curriculum.length;
});

export default mongoose.model('Course', courseSchema);