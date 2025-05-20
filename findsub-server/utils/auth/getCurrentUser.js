// ====================================================================
// 📂 Full File Path & Name: /utils/auth/getCurrentUser.js
// 📌 Purpose: Returns safe user object based on JWT session ID
// 🧩 File Type: Backend Helper Function
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('[getCurrentUser] Error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

module.exports = getCurrentUser;
