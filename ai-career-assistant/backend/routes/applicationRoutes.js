import express from 'express';
import {
  createApplication,
  getMyApplications,
  updateApplicationStatus,
  generateInterviewQuestions
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createApplication)
  .get(protect, getMyApplications);

router.route('/:id').put(protect, updateApplicationStatus);
router.route('/:id/interview-prep').post(protect, generateInterviewQuestions);

export default router;
