console.log('📦 /controllers/AuthController.js mounted');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 Login: Check credentials, return JWT
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // 🧠 Sign a token with the user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 🚫 Never send hashed password back
    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      experienceLevel: user.experienceLevel,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
    };

    res.json({
      message: 'Login successful',
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// 🧾 Registration
exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      gender,
      dateOfBirth,
      experienceLevel,
      phoneNumber,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      gender,
      dateOfBirth,
      experienceLevel,
      phoneNumber,
    });

    await user.save();

    // 🚫 Exclude password from response
    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      experienceLevel: user.experienceLevel,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
    };

    res.status(201).json(safeUser);
  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// 🧠 Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('[ME ERROR]', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
