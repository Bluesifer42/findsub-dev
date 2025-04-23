// routes/AuthRoutes.js
console.log('📦 /routes/AuthRoutes.js mounted');

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser); // becomes /api/auth/register
router.post('/login', authController.loginUser);       // becomes /api/auth/login
router.get('/me', authController.getCurrentUser);      // becomes /api/auth/me

module.exports = router;
