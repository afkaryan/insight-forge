import fs from 'fs';
import pdfParse from 'pdf-parse';
import Resume from '../models/Resume.js';

export const uploadAndParseResumeService = async (userId, file) => {
  if (!file) {
    const error = new Error('Please upload a PDF file');
    error.statusCode = 400;
    throw error;
  }

  try {
    // Read file for parsing
    const dataBuffer = fs.readFileSync(file.path);
    
    // Parse PDF
    const data = await pdfParse(dataBuffer);
    const parsedText = data.text;

    // Simulate AI extraction of skills, education, and experience for now
    const keywords = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'Java', 'Express', 'SQL', 'HTML', 'CSS', 'AWS', 'Docker', 'Git'];
    const extractedSkills = keywords.filter(keyword => 
      parsedText.toLowerCase().includes(keyword.toLowerCase())
    );

    // Create record in DB
    const resume = await Resume.create({
      user: userId,
      fileName: file.originalname,
      fileUrl: `/${file.path.replace(/\\/g, '/')}`,
      parsedText,
      skills: extractedSkills,
      experience: 'Summary derived from text...',
      education: 'Education derived from text...'
    });

    return resume;
  } catch (error) {
    console.error(`Error parsing resume ${file.originalname}:`, error);
    // Even if parsing fails, we might want to save the file record or throw a specific error
    const parsingError = new Error(`Failed to parse PDF: ${error.message}`);
    parsingError.statusCode = 500;
    throw parsingError;
  }
};

export const getMyResumesService = async (userId) => {
  return await Resume.find({ user: userId });
};

export const getResumeByIdService = async (resumeId, userId) => {
  const resume = await Resume.findById(resumeId);

  if (!resume || resume.user.toString() !== userId.toString()) {
    const error = new Error('Resume not found');
    error.statusCode = 404;
    throw error;
  }

  return resume;
};
