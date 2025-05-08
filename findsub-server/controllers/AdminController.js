// 📦 /controllers/AdminController.js
console.log('📦 /controllers/AdminController.js mounted');

const Kink = require('../models/Kink');

/**
 * @route   GET /api/kinks
 * @desc    Get all available kinks
 * @access  Admin (can be restricted in future)
 */
exports.getAllKinks = async (req, res) => {
  try {
    const kinks = await Kink.find();
    res.json(kinks);
  } catch (error) {
    console.error('[AdminController] Failed to fetch kinks:', error);
    res.status(500).json({ error: 'Failed to fetch kinks' });
  }
};

/**
 * @route   POST /api/kinks/create
 * @desc    Create a new kink
 * @access  Admin
 */
exports.createKink = async (req, res) => {
  try {
    const kink = new Kink(req.body);
    await kink.save();
    res.status(201).json(kink);
  } catch (error) {
    console.error('[AdminController] Failed to create kink:', error);
    res.status(500).json({ error: 'Failed to create kink' });
  }
};

/**
 * @route   PUT /api/kinks/:id
 * @desc    Update a kink by ID
 * @access  Admin
 */
exports.updateKink = async (req, res) => {
  try {
    const updated = await Kink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Kink not found' });
    res.json(updated);
  } catch (error) {
    console.error('[AdminController] Failed to update kink:', error);
    res.status(500).json({ error: 'Failed to update kink' });
  }
};

/**
 * @route   DELETE /api/kinks/:id
 * @desc    Delete a kink by ID
 * @access  Admin
 */
exports.deleteKink = async (req, res) => {
  try {
    const deleted = await Kink.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Kink not found' });
    res.json({ message: 'Kink deleted' });
  } catch (error) {
    console.error('[AdminController] Failed to delete kink:', error);
    res.status(500).json({ error: 'Failed to delete kink' });
  }
};
