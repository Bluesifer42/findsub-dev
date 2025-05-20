// ====================================================================
// 📂 Full File Path & Name: /utils/applications/getApplicationsByUser.js
// 📌 Purpose: Fetch all applications submitted by a given user
// 🧩 File Type: Backend Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (owner or self validated upstream)
// ====================================================================

const Application = require('../../models/Application');

const getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ applicant_id: userId })
      .populate({
        path: 'job_id',
        populate: { path: 'posted_by', select: 'username role' },
      })
      .populate('applicant_id', 'username role');

    res.status(200).json({ applications });
  } catch (error) {
    console.error('❌ [getApplicationsByUser] Error:', error);
    res.status(500).json({ error: 'Failed to fetch applications for user' });
  }
};
module.exports = getApplicationsByUser;
