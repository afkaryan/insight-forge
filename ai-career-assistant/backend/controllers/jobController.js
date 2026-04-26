import asyncHandler from 'express-async-handler';
import { searchAndMatchJobsService } from '../services/jobDataService.js';

// @desc    Search jobs and match with a specific resume
// @route   GET /api/jobs/search
// @access  Private
export const searchAndMatchJobs = asyncHandler(async (req, res) => {
  const { keyword, location, resumeId } = req.query;
  const matchedJobs = await searchAndMatchJobsService(keyword, location, resumeId, req.user._id);

  res.json({
    success: true,
    data: matchedJobs
  });
});
