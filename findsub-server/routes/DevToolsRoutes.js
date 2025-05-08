// 📦 /routes/DevToolsRoutes.js mounted
console.log('📦 /routes/DevToolsRoutes.js mounted');

const express = require('express');
const router = express.Router();
const DevToolsController = require('../controllers/DevToolsController');

// ===============================
// 🧪 DevTools Routes (Prefix: /api/devtools)
// ===============================

/**
 * Create a new test user
 * POST /api/devtools/create-user
 */
router.post('/create-user', DevToolsController.createTestUser);

/**
 * Create a new test job
 * POST /api/devtools/create-job
 */
router.post('/create-job', DevToolsController.createTestJob);

module.exports = router;
