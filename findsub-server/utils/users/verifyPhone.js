// ====================================================================
// 📂 Full File Path & Name: /utils/users/verifyPhone.js
// 📌 Purpose: Mark the current user’s phone number as verified
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function verifyPhone(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.phoneVerified = true;
  await user.save();
  return { message: 'Phone number verified successfully.' };
}

module.exports = verifyPhone;
