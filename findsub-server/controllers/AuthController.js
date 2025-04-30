// 📦 /controllers/AuthController.js
console.log('📦 /controllers/AuthController.js mounted');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user, return JWT and user object
 * @access  Public
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

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

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
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

/**
 * @route   GET /api/auth/me
 * @desc    Get authenticated user's data
 * @access  Private (requires JWT)
 */
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
