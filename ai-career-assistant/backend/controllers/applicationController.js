import asyncHandler from 'express-async-handler';
import {
  createApplicationService,
  getMyApplicationsService,
  updateApplicationStatusService,
  generateInterviewQuestionsService
} from '../services/applicationDataService.js';

// @desc    Save job application
// @route   POST /api/applications
// @access  Private
export const createApplication = asyncHandler(async (req, res) => {
  const application = await createApplicationService(req.user._id, req.body);
  res.status(201).json({ success: true, data: application });
});

// @desc    Get user applications
// @route   GET /api/applications
// @access  Private
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await getMyApplicationsService(req.user._id);
  res.json({ success: true, data: applications });
});

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const updatedApplication = await updateApplicationStatusService(req.params.id, req.user._id, req.body);
  res.json({ success: true, data: updatedApplication });
});

// @desc    Generate interview questions
// @route   POST /api/applications/:id/interview-prep
// @access  Private
export const generateInterviewQuestions = asyncHandler(async (req, res) => {
  const questions = await generateInterviewQuestionsService(req.params.id, req.user._id);
  res.json({ success: true, data: { questions } });
});
