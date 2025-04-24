// /controllers/JobsController.js

console.log('📦 /controllers/JobsController.js mounted');

const Job = require('../models/Job');

// ✅ Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get job' });
  }
};

exports.editJob = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Job not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    job.status = req.body.status;
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user jobs' });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ applicants: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get applied jobs' });
  }
};

exports.getFilledJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ selected: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get filled jobs' });
  }
};

// Optional additional route handlers
exports.getJobHistory = async (req, res) => {
  try {
    const jobs = await Job.find({
      $or: [
        { postedBy: req.params.userId },
        { selected: req.params.userId },
        { applicants: req.params.userId },
      ],
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get job history' });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get my jobs' });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    job.applicants.push(req.body.userId);
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply to job' });
  }
};

exports.selectSub = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    job.selected = req.body.userId;
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to select sub' });
  }
};

exports.retractApplication = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    job.applicants = job.applicants.filter(id => id !== req.body.userId);
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retract application' });
  }
};
