import xlsx from 'xlsx';
import JobApplication from '../models/JobApplication.js';

export const exportApplicationsService = async (userId) => {
  const applications = await JobApplication.find({ user: userId })
    .select('jobTitle company location status matchScore appliedDate jobUrl')
    .lean(); // Faster for read-only and no virtuals needed

  if (!applications || applications.length === 0) {
    const error = new Error('No applications found to export');
    error.statusCode = 404;
    throw error;
  }

  // Prepare data for Excel
  const data = applications.map(app => ({
    'Job Title': app.jobTitle,
    'Company': app.company,
    'Location': app.location || 'N/A',
    'Status': app.status.charAt(0).toUpperCase() + app.status.slice(1),
    'Match Score': app.matchScore ? `${app.matchScore}%` : 'N/A',
    'Applied Date': app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A',
    'Job URL': app.jobUrl || 'N/A'
  }));

  // Create workbook and worksheet
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Applications');

  // Create buffer
  return xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
};
