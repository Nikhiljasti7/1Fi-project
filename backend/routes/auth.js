const express = require('express');
const router = express.Router();
const {
  login,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} = require('../controllers/authController');

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', getCurrentUser);

module.exports = router;
