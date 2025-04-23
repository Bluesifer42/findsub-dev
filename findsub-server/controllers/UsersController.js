// /controllers/UsersController.js
console.log('📦 /controllers/UsersController.js mounted');

const User = require('../models/User');

exports.getUserById = async (req, res) => {
  try {
    console.log('📥 getUserById triggered');
  res.send('ok');
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.profilePic = req.body.profilePic;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload profile pic' });
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username role reputation badges');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get public profile' });
  }
};
