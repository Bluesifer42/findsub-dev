// ====================================================================
// 📂 Full File Path & Name: /utils/applications/retractApplication.js
// 📌 Purpose: Allow a user to retract (delete) a submitted job application
// 🧩 File Type: Backend Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub
// ====================================================================

const Application = require('../../models/Application');

const retractApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.params;

    const deletedApplication = await Application.findOneAndDelete({ job_id: jobId, applicant_id: userId });
    if (!deletedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ message: 'Application retracted' });
  } catch (error) {
    console.error('❌ [retractApplication] Error:', error);
    res.status(500).json({ error: 'Failed to retract application' });
  }
};

module.exports = retractApplication;
