// 📦 /routes/AuthRoutes.js
console.log('📦 /routes/AuthRoutes.js mounted');

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken'); // 🔒 Protect private routes

// ===============================
// 🔐 Auth Routes (Prefix: /api/auth)
// ===============================

/**
 * Register a new user.
 * POST /api/auth/register
 */
router.post('/register', AuthController.registerUser);

/**
 * Log in and receive JWT token.
 * POST /api/auth/login
 */
router.post('/login', AuthController.loginUser);

/**
 * Get current authenticated user.
 * GET /api/auth/me
 */
router.get('/me', verifyToken, AuthController.getCurrentUser);

module.exports = router;
