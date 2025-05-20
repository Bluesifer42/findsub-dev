// ====================================================================
// 📂 Full File Path & Name: /utils/payments/chargeOnboardingFee.js
// 📌 Purpose: Charges £1 onboarding fee in dev mode for Voyeur users
// 🧩 File Type: Backend Utility Function
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦  Is a child component : false
// ====================================================================

const { charge } = require('./mockPaymentProcessor');

const chargeOnboardingFee = async (email, role) => {
  if (process.env.NODE_ENV === 'production') return { success: true };

  if (role === 'Voyeur') {
    return await charge({ email }, 1.00, 'Onboarding Fee');
  }

  return { success: true };
};

module.exports = chargeOnboardingFee;
