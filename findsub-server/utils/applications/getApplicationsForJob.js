// ====================================================================
// 📂 Full File Path & Name: /utils/applications/getApplicationsForJob.js
// 📌 Purpose: Fetch all applications tied to a specific job by job ID
// 🧩 File Type: Backend Helper
// 🔐 Requires Authenticated User: true (Dom/Sub only)
// 🔐 Role Restricted: Dom/Sub via route middleware
// ====================================================================

const Application = require('../../models/Application');

const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job_id: jobId })
      .populate('applicant_id', 'username experienceLevel role kinks');

    res.status(200).json({ applications });
  } catch (error) {
    console.error('❌ [getApplicationsForJob] Error:', error);
    res.status(500).json({ error: 'Failed to fetch job applications' });
  }
};
module.exports = getApplicationsForJob;
