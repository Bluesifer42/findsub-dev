// ====================================================================
// 📂 Full File Path & Name: /models/AdminProfile.js
// 📌 Purpose: Defines schema for internal admin-only profile data
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: true (used only by admins)
// 🔐 Role Restricted: Admin (not accessible by Dom/Sub/Switch/Voyeur)
// 🔄 Related Backend Files: /controllers/AdminController.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Referenced via User.adminProfileId
// 🔁 Performs: Stores private contact metadata and tiered permission array
// 🧪 Test Coverage: To be tested in Phase 2 schema tests
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Indexed on display_name for lookup

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
//
// 🎯 Casing Conventions:
// - MongoDB Collection Fields: snake_case
// - Mongoose Model Fields: snake_case
//
// ❗ Error Handling Strategy:
// - All write logic should be wrapped in try/catch from controller layer
//
// 🔁 API Integration:
// - Accessed via population of `User.adminProfileId`
// - Not exposed to public API
//
// 🧰 Behavior Notes:
// - Intended for use by Admins only; other roles will not see this data
//
// ♿ Accessibility:
// - N/A — backend data layer only
//
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

const mongoose = require('mongoose');

const AdminProfileSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact_email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone_number: {
      type: String,
      trim: true,
    },
    avatar_url: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
    permissions: {
    type: [String],
    default: [],
    enum: ['canDeleteUsers', 'canCreateAdmins', 'canSuspendContent']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AdminProfile', AdminProfileSchema);
