const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: 'Online' },
  compensation: { type: String, default: 'Unpaid' },
  duration: { type: String },
  requirements: { type: String },

  category: {
    type: String,
    enum: [
      'Chauffeur',
      'Domestic Cleaning',
      'Meal Prep and Service',
      'Gardener',
      'Stable Slave',
      'Boot Licker',
      'Other'
    ],
    default: 'Other'
  },

  startDate: { type: Date, required: true },
  startTime: { type: String }, // e.g., "14:00"
  minDuration: { type: String }, // e.g., "2 hours"

  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },

  selectedApplicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isFilled: { type: Boolean, default: false },
  fulfilledOn: { type: Date, default: null },   // When the job was accepted
  completedOn: { type: Date, default: null },   // Optional – when both feedback is received

  status: {
    type: String,
    enum: ['open', 'filled', 'completed', 'failed', 'cancelled'],
    default: 'open'
  },

  isEditable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Job', JobSchema);
