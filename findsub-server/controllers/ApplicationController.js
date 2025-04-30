// File: /controllers/ApplicationController.js
// Purpose: Handle all job application logic (fetching, applying, retracting)
// Standards:
// - Uses camelCase
// - Fully annotated
// - Centralized error tracking
// - Console logs on file load
// - RESTful patterns followed

console.log('📦 /controllers/ApplicationController.js mounted');

const Application = require('../models/Application');

/**
 * GET /api/applications/:jobId
 * @desc Fetch all applications for a specific job
 */
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate('applicantId', 'username experienceLevel role kinks');

    res.status(200).json({ applications });
  } catch (error) {
    console.error('❌ [getApplicationsForJob] Error:', error);
    res.status(500).json({ error: 'Failed to fetch job applications' });
  }
};

/**
 * POST /api/apply
 * @desc Submit an application to a job
 */
exports.applyToJob = async (req, res) => {
  try {
    const { jobId, applicantId, coverLetter } = req.body;

    const existing = await Application.findOne({ jobId, applicantId });
    if (existing) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    const newApp = new Application({ jobId, applicantId, coverLetter });
    await newApp.save();

    res.status(201).json({ message: 'Application submitted', application: newApp });
  } catch (error) {
    console.error('❌ [applyToJob] Error:', error);
    res.status(500).json({ error: 'Failed to apply to job' });
  }
};

/**
 * DELETE /api/apply/:jobId/:userId
 * @desc Retract an application from a job
 */
exports.retractApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.params;

    const deleted = await Application.findOneAndDelete({ jobId, applicantId: userId });
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ message: 'Application retracted' });
  } catch (error) {
    console.error('❌ [retractApplication] Error:', error);
    res.status(500).json({ error: 'Failed to retract application' });
  }
};
