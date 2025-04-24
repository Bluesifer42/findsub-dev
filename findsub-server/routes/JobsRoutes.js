// /routes/JobsRoutes.js

console.log('📦 /routes/JobsRoutes.js mounted');

const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// ✅ General Jobs
router.get('/', jobsController.getAllJobs); // /api/jobs
router.post('/', jobsController.createJob); // /api/jobs

// ✅ Specific user-based queries (must be BEFORE :id)
router.get('/user/:userId', jobsController.getUserJobs); // jobs posted by user
router.get('/applied/:userId', jobsController.getAppliedJobs); // jobs user applied to
router.get('/filled/:userId', jobsController.getFilledJobs); // jobs user was selected for

// ✅ Job history (optional)
router.get('/history/:userId', jobsController.getJobHistory); // if used
router.get('/my-jobs/:userId', jobsController.getMyJobs); // if used

// ✅ Actions
router.post('/apply/:jobId', jobsController.applyToJob);
router.post('/select/:jobId', jobsController.selectSub);
router.post('/retract/:jobId', jobsController.retractApplication);
router.post('/status/:id', jobsController.updateJobStatus);

// ✅ Must come LAST to avoid route conflicts
router.get('/:id', jobsController.getJobById); // /api/jobs/:id
router.put('/:id', jobsController.editJob);    // /api/jobs/:id

module.exports = router;
