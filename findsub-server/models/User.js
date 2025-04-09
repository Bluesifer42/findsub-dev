const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Sub', 'Switch', 'Dom'], required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },

  dateOfBirth: { type: Date, required: true },
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  interests: { type: [String], default: [] },
  limits: { type: String, default: '' },

  phoneNumber: { type: String, default: '' },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  bio: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  reputationScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
