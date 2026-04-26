import asyncHandler from 'express-async-handler';
import { 
  registerUserService, 
  loginUserService, 
  getUserProfileService 
} from '../services/authService.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userData = await registerUserService(name, email, password);
  
  res.status(201).json({
    success: true,
    data: userData
  });
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = await loginUserService(email, password);

  res.json({
    success: true,
    data: userData
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const userData = await getUserProfileService(req.user._id);

  res.json({
    success: true,
    data: userData
  });
});
