const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  posterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  description: String,
  location: String,
  compensation: String,
  requirements: String,
  category: String,

  requiredKinks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kink'
  }],

  startDate: Date,
  startTime: String,
  minDuration: String,
  expiresAt: Date,

  // Fulfillment fields
  selectedApplicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isFilled: {
    type: Boolean,
    default: false
  },
  fulfilledOn: Date,
  completedOn: Date,
  status: {
    type: String,
    enum: ['open', 'filled', 'completed', 'failed', 'cancelled'],
    default: 'open'
  },

  // Editable flag for Doms (can relist/cancel)
  isEditable: {
    type: Boolean,
    default: true
  },

  // NEW: Feedback tracking flags
  subFeedbackLeft: {
    type: Boolean,
    default: false
  },
  domFeedbackLeft: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
