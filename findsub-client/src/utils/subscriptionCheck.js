// ====================================================================
// 📂 Full File Path & Name: src/utils/subscriptionCheck.js
// 📌 Purpose: Centralized helper functions for subscription, billing, and role logic
// 🧩 File Type: Shared Utility Module
// 🔐 Requires Authenticated User: true (input only)
// 🔐 Role Restricted: Dom | Sub | Switch | Voyeur (logic checks only)
// 🔄 Related Backend Files: /api/upgrade-role, /api/remove-role
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Called by UI guards, not automatic
// 🧪 Test Coverage: Used across Phase 6 + Phase 7
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Pure synchronous functions

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================

// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
// - Kink references: ObjectId for DB queries; { _id, name, description } for UI display
//
// 🎯 Casing Conventions:
// - MongoDB Collection Fields: snake_case
// - Mongoose Model Fields: snake_case
// - API Request/Response Payloads: camelCase
// - JavaScript Variables & Functions: camelCase
// - React Components: PascalCase
// - CSS Classnames (Tailwind/Custom): kebab-case
//
// ❗ Error Handling Strategy:
// - Never throws — only returns booleans
// - Safe to call on null or incomplete user objects
//
// 🔁 API Integration:
// - Reads state only (does not mutate user)
// - Used to block features when inactive, locked, or downgraded
//
// 🧰 Behavior Notes:
// - Always returns raw booleans
// - Designed for if() guards and inline usage
//
// ♿ Accessibility:
// - Not UI-visible; use paired <p> or <toast> for feedback display
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

export function isSubscriptionExpired(user) {
  return user?.subscription?.billingStatus !== 'active';
}

export function isSwitchActive(user) {
  return user?.sharedProfile?.roles_available?.length === 2;
}

export function isVoyeurOnly(user) {
  return user?.role === 'voyeur';
}

export function isSingleRoleUser(user) {
  return user?.sharedProfile?.roles_available?.length === 1;
}

export function getPrimaryRole(user) {
  return user?.sharedProfile?.roles_available?.[0] || null;
}
