// ====================================================================
// 📂 Full File Path & Name: /utils/logging/logSignupAttempt.js
// 📌 Purpose: Creates a SignupAttempt entry from attempt data
// 🧩 File Type: Backend Utility Function
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦  Is a child component : false
// ====================================================================

const SignupAttempt = require('../../models/SignupAttempt');

const logSignupAttempt = async (attemptData) => {
  try {
    await SignupAttempt.create(attemptData);
  } catch (err) {
    console.warn('[SignupAttempt Logger] Failed to record attempt:', err);
  }
};

module.exports = logSignupAttempt;
