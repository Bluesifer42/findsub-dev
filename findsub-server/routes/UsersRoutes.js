// /routes/UsersRoutes.js
console.log('📦 /routes/UsersRoutes.js mounted');

const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.get('/:id', UsersController.getUserById);
router.post('/update/:id', UsersController.updateUser);
router.post('/profile-pic/:id', UsersController.uploadProfilePic);
router.get('/public/:id', UsersController.getPublicProfile);

module.exports = router;
