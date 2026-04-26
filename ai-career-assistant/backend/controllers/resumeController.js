import asyncHandler from 'express-async-handler';
import { 
  uploadAndParseResumeService, 
  getMyResumesService, 
  getResumeByIdService 
} from '../services/resumeDataService.js';

// @desc    Upload & parse resume
// @route   POST /api/resumes
// @access  Private
export const uploadResume = asyncHandler(async (req, res) => {
  const resume = await uploadAndParseResumeService(req.user._id, req.file);
  res.status(201).json({ success: true, data: resume });
});

// @desc    Get user resumes
// @route   GET /api/resumes
// @access  Private
export const getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await getMyResumesService(req.user._id);
  res.json({ success: true, data: resumes });
});

// @desc    Get resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResumeById = asyncHandler(async (req, res) => {
  const resume = await getResumeByIdService(req.params.id, req.user._id);
  res.json({ success: true, data: resume });
});
