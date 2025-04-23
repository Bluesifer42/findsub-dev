// /routes/JobsRoutes.js
console.log('📦 /routes/JobsRoutes.js mounted');

const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

router.post('/', jobsController.createJob);
router.get('/:id', jobsController.getJobById);
router.put('/:id', jobsController.editJob);
router.post('/status/:id', jobsController.updateJobStatus);
router.get('/user/:userId', jobsController.getUserJobs);
router.get('/applied/:userId', jobsController.getAppliedJobs);
router.get('/filled/:userId', jobsController.getFilledJobs);
router.post('/apply/:jobId', jobsController.applyToJob);
router.post('/select/:jobId', jobsController.selectSub);
router.post('/retract/:jobId', jobsController.retractApplication);

module.exports = router;
