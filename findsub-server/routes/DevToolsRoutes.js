const express = require('express');
const router = express.Router();
const devToolsController = require('../controllers/devToolsController');

router.post('/create-user', devToolsController.createTestUser);
router.post('/create-job', devToolsController.createTestJob);

module.exports = router;
