const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const { requireAuth } = require('../middleware/authMiddleware');
const {
  login,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} = require('../controllers/authController');

router.post('/login', authLimiter, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.get('/me', requireAuth, getCurrentUser);

module.exports = router;
