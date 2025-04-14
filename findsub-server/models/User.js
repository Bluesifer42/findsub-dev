const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Sub', 'Switch', 'Dom'], required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: Date, required: true },
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  // Free-text interests removed in favor of structured kinks.
  // interests: { type: [String], default: [] },
  // New field for structured kink selections. Each entry links to a Kink (in a new Kink model) and stores a rating.
  kinks: [{
    kink: { type: mongoose.Schema.Types.ObjectId, ref: 'Kink' },
    rating: {
      type: String,
      enum: ['Hard Limit', 'Limit', 'Like it', 'Love it', 'Live for it'],
      default: 'Like it'
    }
  }],
  kinkHistory: [{
    kink: { type: mongoose.Schema.Types.ObjectId, ref: 'Kink' },
    rating: { 
      type: String,
      enum: ['Hard Limit', 'Limit', 'Like it', 'Love it', 'Live for it'],
      default: 'Like it'
    }
  }],
  limits: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  
  bio: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  reputationScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },

  // New fields for trust and profile integrity
  trustScore: { type: Number, default: 0 },
  profileCompletion: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  averageHonestyScore: { type: Number, default: 0 },
  isAddressVerified: { type: Boolean, default: false },
  // Array of badge references (for later badge functionality)
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  badgeTier: { type: Number, default: 0 }
});

// A helper method to recalc the trust score
UserSchema.methods.recalculateTrustScore = function() {
  let baseProfileScore = 0;
  // We'll consider a profile “complete” if email, phone, and address are verified,
  // the bio is filled in, and at least one kink is selected.
  if (this.emailVerified && this.phoneVerified && this.isAddressVerified && this.bio && this.kinks.length > 0) {
    baseProfileScore = 100;
  }
  const jobPoints = this.completedJobs * 5;
  const honestyBonus = (this.averageHonestyScore || 0) * 2;

  this.trustScore = baseProfileScore + jobPoints + honestyBonus;
  return this.trustScore;
};

module.exports = mongoose.model('User', UserSchema);
