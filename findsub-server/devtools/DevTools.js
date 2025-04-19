const bcrypt = require('bcryptjs');
const User = require('../models/User');

const DevTools = {
  async createTestUser(req, res) {
    try {
      const { username, role, isAdmin = false } = req.body;

      if (!username || !role) {
        return res.status(400).json({ message: 'Missing fields.' });
      }

      const email = `${username}@findsub.com`;

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'User already exists.' });

      const hashedPassword = await bcrypt.hash('1234', 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        experienceLevel: 'Beginner',
        isAdmin
      });

      await newUser.save();
      res.status(201).json({ message: 'Test user created.', user: newUser });

    } catch (error) {
      console.error('DevTools: createTestUser error:', error);
      res.status(500).json({ message: 'Failed to create user.' });
    }
  }
};

module.exports = DevTools;
