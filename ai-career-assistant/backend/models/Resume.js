import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  parsedText: {
    type: String, // Extracted full text from PDF
    required: true
  },
  skills: [String], // AI extracted skills
  experience: String,
  education: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
