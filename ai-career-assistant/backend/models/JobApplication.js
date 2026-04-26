import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume' // Optional link to which resume was used
  },
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: String,
  description: String, // Full job description
  jobUrl: String,
  matchScore: Number, // Pre-calculated AI match score
  status: {
    type: String,
    enum: ['saved', 'applied', 'interviewing', 'rejected', 'offer'],
    default: 'saved'
  },
  appliedDate: Date,
  interviewQuestions: [String], // AI generated interview questions
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
