import express from 'express';
import { exportApplications } from '../controllers/exportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/applications').get(protect, exportApplications);

export default router;
