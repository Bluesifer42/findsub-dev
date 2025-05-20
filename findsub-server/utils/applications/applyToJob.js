// ====================================================================
// 📂 Full File Path & Name: /utils/applications/applyToJob.js
// 📌 Purpose: Handle job application submission for authenticated Subs
// 🧩 File Type: Backend Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub (via route middleware)
// ====================================================================

const Job = require('../../models/Job');
const Application = require('../../models/Application');

const applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const applicantId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.posted_by.toString() === applicantId) {
      return res.status(403).json({ error: 'Cannot apply to your own job' });
    }

    const existingApplication = await Application.findOne({ job_id: jobId, applicant_id: applicantId });
    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    const newApplication = new Application({
      job_id: jobId,
      applicant_id: applicantId,
      cover_letter: coverLetter,
      acting_as: req.actingAs,
    });

    await newApplication.save();

    res.status(201).json({ message: 'Application submitted', application: newApplication });
  } catch (error) {
    console.error('❌ [applyToJob] Error:', error);
    res.status(500).json({ error: 'Failed to apply to job' });
  }
};
module.exports = applyToJob;
