// ====================================================================
// 📂 Full File Path & Name: /utils/kinks/updateKink.js
// 📌 Purpose: Update a kink document by ID
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/KinkRoutes.js, /controllers/KinkController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Kink = require('../../models/Kink');

async function updateKink(id, updateData) {
  const kink = await Kink.findByIdAndUpdate(id, updateData, { new: true });
  return kink;
}

module.exports = updateKink;
