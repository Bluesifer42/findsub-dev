// 📦 /routes/UsersRoutes.js
console.log('📦 /routes/UsersRoutes.js mounted');

const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// 🧠 View user by ID
router.get('/:id', UsersController.getUserById);

// ✏️ Update user info
router.post('/update/:id', UsersController.updateUser);

// 🖼 Upload profile picture
router.post('/profile-pic/:id', UsersController.uploadProfilePic);

// 🌐 Public-facing profile (no sensitive info)
router.get('/public/:id', UsersController.getPublicProfile);

module.exports = router;
