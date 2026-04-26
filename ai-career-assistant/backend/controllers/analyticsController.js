import asyncHandler from 'express-async-handler';
import { getAnalyticsService } from '../services/analyticsDataService.js';

// @desc    Get application analytics
// @route   GET /api/analytics
// @access  Private
export const getAnalytics = asyncHandler(async (req, res) => {
  const analyticsData = await getAnalyticsService(req.user._id);

  res.json({
    success: true,
    data: analyticsData
  });
});
