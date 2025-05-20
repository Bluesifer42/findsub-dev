// ====================================================================
// 📂 Full File Path & Name: /utils/kinks/getAllKinks.js
// 📌 Purpose: Fetch and return all kink records sorted alphabetically
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/KinkRoutes.js, /controllers/KinkController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Kink = require('../../models/Kink');

async function getAllKinks() {
  return await Kink.find().sort({ name: 1 });
}

module.exports = getAllKinks;
