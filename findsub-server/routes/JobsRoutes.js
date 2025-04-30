// File: /routes/JobsRoutes.js
// Purpose: Manage all job-related route paths (public, poster, applicant actions)
// Standards:
// - Uses camelCase
// - Fully annotated
// - Follows RESTful structure
// - Centralized error handling
// - Console logs on file load

console.log('📦 /routes/JobsRoutes.js mounted');

const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/JobsController');

// ✅ Public Jobs
router.get('/', JobsController.getAllJobs);
router.post('/', JobsController.createJob);

// ✅ Single Job
router.get('/:id', JobsController.getJobById);
router.put('/:id', JobsController.editJob);

// ✅ Poster job list view (for manage listings)
router.get('/poster', JobsController.getJobsByPoster);

// ✅ Dom / Poster job history
router.get('/history/:domId', JobsController.getDomJobHistory);

// ✅ Jobs awaiting feedback
router.get('/awaiting-feedback/:userId', JobsController.getJobsAwaitingFeedback);

// ✅ Sub accepted jobs (filled and completed)
router.get('/filled/:userId', JobsController.getFilledJobsForUser);

// ✅ (NEW) Get applications for a job
router.get('/applications/:jobId', JobsController.getApplicationsForJob);

// ✅ Actions
router.post('/status/:id', JobsController.updateJobStatus);
router.delete('/delete/:jobId', JobsController.deleteJob);
router.post('/select', JobsController.selectApplicant);
router.post('/apply', JobsController.applyToJob);
router.delete('/apply/:jobId/:userId', JobsController.retractApplication);

module.exports = router;
