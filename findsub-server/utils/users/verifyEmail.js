// ====================================================================
// 📂 Full File Path & Name: /utils/users/verifyEmail.js
// 📌 Purpose: Mark the current user’s email as verified
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function verifyEmail(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.emailVerified = true;
  await user.save();
  return { message: 'Email verified successfully.' };
}

module.exports = verifyEmail;
