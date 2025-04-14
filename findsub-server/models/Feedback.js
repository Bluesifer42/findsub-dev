const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Dynamic map for general ratings (allows any keys, for Dom or Sub feedback)
  generalRatings: {
    type: Map,
    of: {
      type: Number,
      min: 0,
      max: 5
    },
    required: true
  },
  // Interest ratings; optional for Dom feedback (if applicable)
  interestRatings: { 
    type: Map,
    of: Number,
    default: {}
  },
  // Badge gifting data; optional and only used when a Dom is gifting badges
  badgeGifting: {
    type: Map,
    of: Number,
    default: {}
  },
  // Honesty score: from 0 to 5 (defaulted to 5)
  honestyScore: { type: Number, min: 0, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  isFlagged: { type: Boolean, default: false },
  flagReason: { type: String, default: '' }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
