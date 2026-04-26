import asyncHandler from 'express-async-handler';
import { exportApplicationsService } from '../services/exportDataService.js';

// @desc    Export applications to Excel
// @route   GET /api/export/applications
// @access  Private
export const exportApplications = asyncHandler(async (req, res) => {
  const excelBuffer = await exportApplicationsService(req.user._id);

  res.setHeader('Content-Disposition', 'attachment; filename="job_applications.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(excelBuffer);
});
