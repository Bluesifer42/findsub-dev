// ====================================================================
// 📂 Full File Path & Name: /utils/auth/registerUser.js
// 📌 Purpose: Handles new user registration, fee charging, profile setup, and logging
// 🧩 File Type: Backend Helper Function
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any (public register endpoint)
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const SignupAttempt = require('../../models/SignupAttempt');
const generateSubscription = require('../subscription/generateSubscription');
const chargeOnboardingFee = require('../payments/chargeOnboardingFee');
const createSharedProfile = require('../profile/createSharedProfile');
const logSignupAttempt = require('../logging/logSignupAttempt');
const buildSafeUser = require('./buildSafeUser');

async function registerUser(req, res) {
  const {
    username, email, password, role, gender,
    dateOfBirth, experienceLevel, phoneNumber
  } = req.body;

  const attemptLog = {
    email,
    attempted_role: role,
    ip: req.ip,
    user_agent: req.headers['user-agent'] || 'unknown',
    success: false,
    error_message: ''
  };

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      attemptLog.error_message = 'Email already registered';
      await logSignupAttempt(attemptLog);
      return res.status(403).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const devWallet = process.env.NODE_ENV !== 'production'
      ? { balance: 10.00, isDev: true }
      : undefined;

    const feeResult = await chargeOnboardingFee(role, email);
    if (!feeResult.success) {
      attemptLog.error_message = feeResult.message;
      await logSignupAttempt(attemptLog);
      return res.status(402).json({ error: feeResult.message });
    }

    const subscription = generateSubscription(role);
    const sharedProfile = await createSharedProfile(username, role);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      gender,
      dateOfBirth,
      experienceLevel,
      phoneNumber,
      devWallet,
      sharedProfileId: sharedProfile._id,
      subscription
    });

    await user.save();

    attemptLog.success = true;
    await logSignupAttempt(attemptLog);

    const safeUser = buildSafeUser(user);
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user: safeUser, token });
  } catch (error) {
    console.error('[registerUser] Error:', error);
    attemptLog.success = false;
    attemptLog.error_message = error.message || 'Registration failed';
    await logSignupAttempt(attemptLog);
    res.status(500).json({ error: 'Registration failed' });
  }
}

module.exports = registerUser;
