import express from 'express';
import { searchAndMatchJobs } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', protect, searchAndMatchJobs);

export default router;
