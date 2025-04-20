const Kink = require('../models/Kink');

const AdminKinksController = {
  // Get all kinks
  getAllKinks: async (req, res) => {
    try {
      const kinks = await Kink.find({}).sort({ name: 1 });
      res.json({ kinks });
    } catch (err) {
      console.error('Error fetching kinks:', err);
      res.status(500).json({ message: 'Failed to fetch kinks.' });
    }
  },

  // Create a kink (already used)
  createKink: async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ message: 'Name and description required.' });
      }

      const existing = await Kink.findOne({ name });
      if (existing) {
        return res.status(409).json({ message: 'Kink already exists.' });
      }

      const kink = new Kink({ name, description });
      await kink.save();
      res.status(201).json({ message: 'Kink created.', kink });
    } catch (err) {
      console.error('Error creating kink:', err);
      res.status(500).json({ message: 'Failed to create kink.' });
    }
  },

  // Update a kink
  updateKink: async (req, res) => {
    try {
      const { name, description } = req.body;
      const updated = await Kink.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
      res.json({ message: 'Kink updated.', kink: updated });
    } catch (err) {
      console.error('Error updating kink:', err);
      res.status(500).json({ message: 'Failed to update kink.' });
    }
  },

  // Delete a kink
  deleteKink: async (req, res) => {
    try {
      await Kink.findByIdAndDelete(req.params.id);
      res.json({ message: 'Kink deleted.' });
    } catch (err) {
      console.error('Error deleting kink:', err);
      res.status(500).json({ message: 'Failed to delete kink.' });
    }
  }
};

module.exports = AdminKinksController;
