// ====================================================================
// 📂 Full File Path & Name: /utils/kinks/createKink.js
// 📌 Purpose: Create a new kink if one with the same name doesn't already exist
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/KinkRoutes.js, /controllers/KinkController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Kink = require('../../models/Kink');

async function createKink(name, description) {
  const existing = await Kink.findOne({ name });
  if (existing) return { conflict: true, message: 'Kink already exists' };

  const kink = new Kink({ name, description });
  await kink.save();
  return { success: true, kink };
}

module.exports = createKink;
