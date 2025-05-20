// ====================================================================
// 📂 Full File Path & Name: /utils/auth/buildSafeUser.js
// 📌 Purpose: Returns a safe user object for frontend (excludes password)
// 🧩 File Type: Backend Utility Function
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦  Is a child component : false
// ====================================================================

const buildSafeUser = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    experienceLevel: user.experienceLevel,
    phoneNumber: user.phoneNumber
  };
};

module.exports = buildSafeUser;
