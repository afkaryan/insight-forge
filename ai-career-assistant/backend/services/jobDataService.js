import Resume from '../models/Resume.js';
import { fetchJobs } from './jobService.js';
import { calculateMatchScore } from './matchService.js';

export const searchAndMatchJobsService = async (keyword, location, resumeId, userId) => {
  if (!resumeId) {
    const error = new Error('Please provide a resume ID');
    error.statusCode = 400;
    throw error;
  }

  const resume = await Resume.findById(resumeId);
  if (!resume || resume.user.toString() !== userId.toString()) {
    const error = new Error('Resume not found');
    error.statusCode = 404;
    throw error;
  }

  // Fetch jobs from public API
  const jobs = await fetchJobs(keyword, location);

  // Calculate match score for each job
  const matchedJobs = jobs.map(job => {
    const matchDetails = calculateMatchScore(resume, job);
    return {
      ...job,
      matchScore: matchDetails.score,
      matchedSkills: matchDetails.matchedSkills,
      missingSkills: matchDetails.missingSkills
    };
  }).sort((a, b) => b.matchScore - a.matchScore); // Sort by highest score

  return matchedJobs;
};
