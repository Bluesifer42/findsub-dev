// ============================================
// File: /models/Job.js
// Purpose: Defines the Job model schema for job listings, applications, and fulfillment tracking
// Standards:
// - Uses camelCase
// - Fully annotated
// - No removed legacy logic (only expanded where needed)
// - Includes timestamps
// ============================================

const mongoose = require('mongoose');

// ✅ Define Job Schema
const JobSchema = new mongoose.Schema({
  // 📌 User who posted the job (Dom or Switch)
  posterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 📋 Job Details
  title: { type: String },
  description: { type: String },
  location: { type: String },
  compensation: { type: String },
  requirements: { type: String },
  category: { type: String },

  // 🎯 Required Kinks (references Kink model)
  requiredKinks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kink'
  }],

  // 🕒 Timing Details
  startDate: { type: Date },
  startTime: { type: String },
  minDuration: { type: String },
  expiresAt: { type: Date },

  // 🧑‍🤝‍🧑 Applicants (NEW - added for handling applications)
  applicants: [
    {
      applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      coverLetter: { type: String },
      appliedAt: { type: Date, default: Date.now }
    }
  ],

  // 🏁 Fulfillment Fields
  selectedApplicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isFilled: {
    type: Boolean,
    default: false
  },
  fulfilledOn: { type: Date },
  completedOn: { type: Date },
  status: {
    type: String,
    enum: ['open', 'filled', 'completed', 'failed', 'cancelled'],
    default: 'open'
  },

  // ✏️ Editable flag for Doms (can relist or cancel jobs)
  isEditable: {
    type: Boolean,
    default: true
  },

  // 📝 Feedback Tracking Flags
  subFeedbackLeft: {
    type: Boolean,
    default: false
  },
  domFeedbackLeft: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true // ✅ Automatically includes createdAt and updatedAt
});

// ✅ Export Job Model
module.exports = mongoose.model('Job', JobSchema);
