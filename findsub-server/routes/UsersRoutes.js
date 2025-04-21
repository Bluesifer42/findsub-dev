const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:id', usersController.getUserById);
router.post('/update/:id', usersController.updateUser);
router.post('/profile-pic/:id', usersController.uploadProfilePic);
router.get('/public/:id', usersController.getPublicProfile);

module.exports = router;
