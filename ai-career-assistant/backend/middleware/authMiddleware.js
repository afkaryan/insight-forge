import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Authorization Error Detail:', error.message);
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Token expired, please login again' });
      } else if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Invalid token, please login again' });
      } else {
        res.status(401).json({ message: `Not authorized: ${error.message}` });
      }
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
