import JobApplication from '../models/JobApplication.js';

export const createApplicationService = async (userId, applicationData) => {
  const {
    resume,
    jobTitle,
    company,
    location,
    description,
    jobUrl,
    matchScore,
    status
  } = applicationData;

  const application = await JobApplication.create({
    user: userId,
    resume,
    jobTitle,
    company,
    location,
    description,
    jobUrl,
    matchScore,
    status: status || 'saved',
    appliedDate: status === 'applied' ? Date.now() : null,
  });

  return application;
};

export const getMyApplicationsService = async (userId) => {
  return await JobApplication.find({ user: userId }).sort('-createdAt');
};

export const updateApplicationStatusService = async (applicationId, userId, updateData) => {
  const { status, notes } = updateData;
  const application = await JobApplication.findById(applicationId);

  if (!application || application.user.toString() !== userId.toString()) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    throw error;
  }

  application.status = status || application.status;
  application.notes = notes !== undefined ? notes : application.notes;
  
  if (status === 'applied' && !application.appliedDate) {
    application.appliedDate = Date.now();
  }

  return await application.save();
};

export const generateInterviewQuestionsService = async (applicationId, userId) => {
  const application = await JobApplication.findById(applicationId);

  if (!application || application.user.toString() !== userId.toString()) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    throw error;
  }

  // Simulate calling an LLM API to get questions
  const questions = [
    `Can you tell me about your experience with ${application.jobTitle} roles?`,
    `How do your skills match the requirements for ${application.company}?`,
    `Describe a challenging project you have worked on recently.`,
    `Why do you want to work for ${application.company}?`
  ];

  application.interviewQuestions = questions;
  await application.save();

  return questions;
};
