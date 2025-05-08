// File: /controllers/JobsController.js
// Purpose: Define all job-related controller logic (create, read, update, delete, and manage applications)
// Standards:
// - Uses camelCase
// - Fully annotated
// - Follows RESTful structure
// - Centralized error handling
// - Console logs on file load for traceability

console.log('📦 /controllers/JobsController.js mounted');

const Job = require('../models/Job');

// ===========================
// 📋 Jobs Core
// ===========================

/**
 * GET /api/jobs
 * @desc Fetch all jobs (public job board)
 */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('❌ [getAllJobs] Error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

/**
 * POST /api/jobs
 * @desc Create a new job
 */
exports.createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('❌ [createJob] Error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

/**
 * GET /api/jobs/:id
 * @desc Get a specific job by ID
 */
exports.getJobById = async (req, res) => {
  console.log(`📥 [getJobById] Fetching job by ID: ${req.params.id}`);
  try {
    const job = await Job.findById(req.params.id)
      .populate('posterId', 'username role')
      .populate('selectedApplicant', 'username role')
      .populate('requiredKinks', 'name description')
    
    if (!job) {
      console.warn(`⚠️ [getJobById] No job found for ID: ${req.params.id}`);
      return res.status(404).json({ error: 'Job not found' });
    }
    
    console.log('✅ [getJobById] Job found:', job);
    res.status(200).json({ job }); // <-- WRAP it like this
  } catch (error) {
    console.error('❌ [getJobById] Error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

/**
 * PUT /api/jobs/:id
 * @desc Edit an existing job
 */
exports.editJob = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(updated);
  } catch (error) {
    console.error('❌ [editJob] Error:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// ===========================
// 🏗 Jobs By Poster / History
// ===========================

/**
 * GET /api/jobs/poster
 * @desc Fetch jobs posted by a specific user (posterId from query)
 */
exports.getJobsByPoster = async (req, res) => {
  try {
    const { posterId } = req.query;
    const jobs = await Job.find({ posterId });
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('❌ [getJobsByPoster] Error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs by poster' });
  }
};

/**
 * GET /api/jobs/history/:domId
 * @desc Fetch completed or failed jobs posted by a Dom
 */
exports.getDomJobHistory = async (req, res) => {
  try {
    const domId = req.params.domId;
    const jobs = await Job.find({
      posterId: domId,
      status: { $in: ['completed', 'failed'] }
    });
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('❌ [getDomJobHistory] Error:', error);
    res.status(500).json({ error: 'Failed to fetch Dom job history' });
  }
};

// ===========================
// 🎯 Targeted Fetch (Sub / Dom feedback views)
// ===========================

/**
 * GET /api/jobs/awaiting-feedback/:userId
 * @desc Fetch jobs awaiting feedback for a user
 */
exports.getJobsAwaitingFeedback = async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobs = await Job.find({
      $or: [
        { selectedApplicant: userId },
        { posterId: userId }
      ],
      status: 'completed'
    });
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('❌ [getJobsAwaitingFeedback] Error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs awaiting feedback' });
  }
};

/**
 * GET /api/jobs/filled/:userId
 * @desc Fetch accepted jobs (active jobs for Sub)
 */
exports.getFilledJobsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await Job.find({
      selectedApplicant: userId,
      status: { $in: ['filled', 'completed'] }
    }).populate('posterId', 'username role');
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('❌ [getFilledJobsForUser] Error:', error);
    res.status(500).json({ error: 'Failed to fetch accepted jobs' });
  }
};

// ===========================
// ⚙️ Actions on Jobs
// ===========================

/**
 * POST /api/jobs/status/:id
 * @desc Update a job's status
 */
exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    job.status = req.body.status;
    await job.save();
    res.status(200).json(job);
  } catch (error) {
    console.error('❌ [updateJobStatus] Error:', error);
    res.status(500).json({ error: 'Failed to update job status' });
  }
};

/**
 * DELETE /api/jobs/delete/:jobId
 * @desc Delete a job by ID
 */
exports.deleteJob = async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.jobId);
    if (!deleted) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json({ message: 'Job deleted' });
  } catch (error) {
    console.error('❌ [deleteJob] Error:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};

/**
 * POST /api/jobs/select
 * @desc Select a Sub applicant for a job
 */
exports.selectApplicant = async (req, res) => {
  try {
    const { jobId, applicantId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    job.selectedApplicant = applicantId;
    job.isFilled = true;
    job.status = 'filled';
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    console.error('❌ [selectApplicant] Error:', error);
    res.status(500).json({ error: 'Failed to select applicant' });
  }
};

// ===========================
// 🙋 Applications
// ===========================

/**
 * POST /api/jobs/apply
 * @desc Apply to a job
 */
exports.applyToJob = async (req, res) => {
  try {
    const { jobId, applicantId, coverLetter } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    job.applicants.push({ applicantId, coverLetter });
    await job.save();
    res.status(200).json(job);
  } catch (error) {
    console.error('❌ [applyToJob] Error:', error);
    res.status(500).json({ error: 'Failed to apply to job' });
  }
};

/**
 * DELETE /api/apply/:jobId/:userId
 * @desc Retract a user's application
 */
exports.retractApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    job.applicants = job.applicants.filter(app => app.applicantId.toString() !== userId);
    await job.save();

    res.status(200).json({ message: 'Application retracted' });
  } catch (error) {
    console.error('❌ [retractApplication] Error:', error);
    res.status(500).json({ error: 'Failed to retract application' });
  }
};

/**
 * GET /api/applications/:jobId
 * @desc Fetch all applications for a given job
 */
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('applicants.applicantId', 'username role experienceLevel');

    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.status(200).json({ applications: job.applicants || [] });
  } catch (error) {
    console.error('❌ [getApplicationsForJob] Error:', error);
    res.status(500).json({ error: 'Failed to fetch job applications' });
  }
};
