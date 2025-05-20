// ====================================================================
// 📂 Full File Path & Name: /utils/kinks/deleteKink.js
// 📌 Purpose: Permanently delete a kink by ID
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/KinkRoutes.js, /controllers/KinkController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Kink = require('../../models/Kink');

async function deleteKink(id) {
  const deleted = await Kink.findByIdAndDelete(id);
  return deleted;
}

module.exports = deleteKink;
