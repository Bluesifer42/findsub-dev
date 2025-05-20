// ====================================================================
// 📂 Full File Path & Name: /utils/auth/loginUser.js
// 📌 Purpose: Logs user in, validates credentials, and triggers downgrade logic
// 🧩 File Type: Backend Helper Function
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any (public login endpoint)
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const SharedProfile = require('../../models/SharedProfile');
const handleAutoDowngrade = require('../subscription/handleAutoDowngrade');
const buildSafeUser = require('./buildSafeUser');

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    await handleAutoDowngrade(user);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = buildSafeUser(user);
    res.json({ message: 'Login successful', token, user: safeUser });
  } catch (error) {
    console.error('[loginUser] Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = loginUser;
