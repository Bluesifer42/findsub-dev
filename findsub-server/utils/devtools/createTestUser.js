// ====================================================================
// 📂 Full File Path & Name: /utils/devtools/createTestUser.js
// 📌 Purpose: Generate a full test user with shared profile, subscription, and devWallet
// 🧩 File Type: Express Helper Function
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Dev/Admin
// 🔄 Related Backend Files: /routes/DevToolsRoutes.js, /controllers/DevToolsController.js
// 👩‍👦  Is a child component : false
// ====================================================================

const bcrypt = require('bcrypt');
const User = require('../../models/User');
const SharedProfile = require('../../models/SharedProfile');
const generateSubscription = require('../subscription/generateSubscription');

module.exports = async function createTestUser(role) {
  if (!role || !['Dom', 'Sub', 'Voyeur'].includes(role)) {
    throw new Error('Role must be Dom, Sub, or Voyeur');
  }

  const suffix = Math.floor(Math.random() * 100000);
  const username = `Test${role}${suffix}`;
  const email = `${username.toLowerCase()}@findsub.com`;
  const hashedPassword = await bcrypt.hash('1234', 10);

  const sharedProfile = new SharedProfile({
    display_name: username,
    avatar_url: '',
    bio: '',
    roles_available: role === 'Voyeur' ? [] : [role.toLowerCase()],
    reputation: { dom: 0, sub: 0 }
  });
  await sharedProfile.save();

  const subscription = generateSubscription(role);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    role,
    gender: 'female',
    dateOfBirth: new Date('1995-01-01'),
    experienceLevel: 'Beginner',
    phoneNumber: '07000000000',
    sharedProfileId: sharedProfile._id,
    devWallet: {
      balance: 10.0,
      isDev: true
    },
    testAccount: true,
    status: 'active',
    createdAt: new Date(),
    subscription
  });

  await user.save();

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    password: '1234',
    role: user.role
  };
};
