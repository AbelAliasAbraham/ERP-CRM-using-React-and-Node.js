// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// IMPORT ALL CONTROLLERS
const {
  register,
  login,
  getMe
} = require('../controllers/authController');

// 1. Register (admin only)
router.post(
  '/register',
  [auth, role('admin')],
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  register
);

// 2. Login (public)
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').exists().withMessage('Password required')
  ],
  login
);

// 3. Get logged-in user
router.get('/me', auth, getMe);

module.exports = router;