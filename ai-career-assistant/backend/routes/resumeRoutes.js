import express from 'express';
import { uploadResume, getMyResumes, getResumeById } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, upload.single('resume'), uploadResume)
  .get(protect, getMyResumes);

router.route('/:id').get(protect, getResumeById);

export default router;
