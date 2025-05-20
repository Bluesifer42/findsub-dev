// ====================================================================
// 📂 Full File Path & Name: /utils/admin/getSignupAttempts.js
// 📌 Purpose: Fetches last 100 signup attempts for admin monitoring
// ====================================================================

const SignupAttempt = require('../../models/SignupAttempt');

module.exports = async function getSignupAttempts() {
  try {
    return await SignupAttempt.find({}).sort({ timestamp: -1 }).limit(100);
  } catch (err) {
    console.error('[getSignupAttempts] Failed to load signup attempts:', err);
    throw new Error('Failed to load signup attempts');
  }
};