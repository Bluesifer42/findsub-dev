// routes/AuthRoutes.js
console.log('📦 /routes/AuthRoutes.js mounted');

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken'); // ✅ NEW

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/me', verifyToken, authController.getCurrentUser); // ✅ Protected route

module.exports = router;

