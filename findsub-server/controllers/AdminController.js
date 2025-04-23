const Kink = require('../models/Kink');
console.log('📦 /controllers/AdminController.js mounted');

exports.getAllKinks = async (req, res) => {
  try {
    const kinks = await Kink.find();
    res.json(kinks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch kinks' });
  }
};

exports.createKink = async (req, res) => {
  try {
    const kink = new Kink(req.body);
    await kink.save();
    res.status(201).json(kink);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create kink' });
  }
};

exports.updateKink = async (req, res) => {
  try {
    const updated = await Kink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Kink not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update kink' });
  }
};

exports.deleteKink = async (req, res) => {
  try {
    const deleted = await Kink.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Kink not found' });
    res.json({ message: 'Kink deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete kink' });
  }
};
