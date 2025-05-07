// File: /routes/ApplicationRoutes.js
// Purpose: Route definitions for job application system
// Standards:
// - Uses camelCase
// - Fully annotated
// - Console log on load
// - Centralized controller pattern
// - RESTful structure

console.log('📦 /routes/ApplicationRoutes.js mounted');

const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/ApplicationController');

// ✅ Get all applications by user (for Subs)
router.get('/user/:userId', ApplicationController.getApplicationsByUser);

// ✅ Get all applications for a specific job
router.get('/:jobId', ApplicationController.getApplicationsForJob);

// ✅ Apply to a job
router.post('/', ApplicationController.applyToJob);

// ✅ Retract an application
router.delete('/:jobId/:userId', ApplicationController.retractApplication);

module.exports = router;
