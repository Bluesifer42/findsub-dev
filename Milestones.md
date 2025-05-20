# ✅ RealSubs Development Milestones

This document tracks the current, upcoming, and requested feature enhancements for the FindSub / RealSubs BDSM platform.

---

## 🟩 Core Features

- [x] Sub and Dom account creation
- [x] Public profile pages
- [x] Basic editable profile
- [x] Job posting by Dom or Switch
- [x] Job board for Subs
- [x] Job application by Sub
- [x] Poster can view applicants
- [x] Poster can select applicant
- [x] Jobs can be cancelled or re-listed
- [x] Job status system (open, filled, completed, failed, cancelled)
- [x] Role-specific job tabs (e.g. “Manage Jobs” vs “Job History”)
- [x] Applications visible inline to Dom in JobDetail view
- [x] Completed jobs allow mutual feedback
- [x] Feedback triggers reputation + honesty update
- [x] Job categories enum (Chauffeur, Domestic Cleaning, etc.)
- [x] Job start date, start time, minimum duration stored
- [x] Required kinks can be assigned to jobs

---

## 🔁 Feedback System

- [x] Feedback form with role-specific fields
- [x] Shared general rating + honesty score
- [x] Subs rate Doms: strictness, communication, etc.
- [x] Doms rate Subs: obedience, work ethic, etc.
- [x] Kink-based interest ratings included (for Doms)
- [x] Feedback only enabled once job is marked “completed”
- [x] Feedback must be mutual to influence trust score
- [x] Feedback display on JobDetail with interest ratings
- [x] Feedback form includes badge gifting

---

## 🧠 Trust & Reputation

- [x] Trust score calculation includes profile completeness + job history
- [x] Honesty score derived from feedback
- [x] Reputation score = average feedback rating
- [x] Badge gifting system supports kink-linked recognition
- [x] Badge tier logic (based on count)
- [x] Public trust score on profile
- [x] Admin DevTools support feedback + badge flow testing

---

## ⚒️ Admin Features

- [x] Dedicated admin dashboard
- [x] Admin sidebar auto-loads for admin accounts
- [x] View all users
- [x] View/delete any job
- [x] View all feedback system-wide
- [x] View/add/edit/delete kinks
- [x] See selected applicant inline on job view
- [x] DevTools panel (for testing/staging)
  - [x] Create test users (auto email + password 1234)
  - [x] Create test job (linked to Dom)
  - [x] Generate fake applications (Sub + job selected)
  - [x] Purge: Users, Jobs, Applications, Feedback
  - [x] All DevTools moved to a separate modular file
- [x] Kinks manager supports edit/delete inline
- [x] Submitting feedback sets flags (`subFeedbackLeft`, `domFeedbackLeft`)
- [x] Admin panel structure with route protection
- [x] Kink Manager (CRUD) with AdminKinkController.js
- [x] Admin sidebar with dynamic role detection
- [x] DevTools module created in devtools/DevTools.js
- [x] Create test users (default password: 1234)
- [x] Auto-generate user emails as <username>@findsub.com
- [x] Create test jobs assigned to selected Dom
- [x] Generate test applications from Sub to Job
- [x] Purge utilities for: users, jobs, applications, feedback
- [x] Admin views for: all users, all jobs, all feedback
- [x] Admin ability to delete users, jobs, and feedback
- [x] Admin sidebar links to all tools and dashboards
- [x] AdminKinks.jsx: inline editing and deletion now active
- [x] Modular controller created: AdminKinkController.js

---

## ⚙️ In Progress / Upcoming

- [ ] Admin: Manually trigger trust recalculation per user
- [ ] Show all feedback given/received by a user in admin view
- [ ] Feedback summary per user (average ratings)
- [ ] View badge ownership + badge tier visually
- [ ] Feedback tab on profile
- [ ] Reputation badge system (displayed icons)
- [ ] "Jobs I Applied To" tab for Subs
- [ ] Soft-delete system for content moderation
- [ ] Admin warnings or notes on users
- [ ] Modularizing backend: splitting server.js into routes/ and controllers/
- [ ] Route groups: auth, jobs, users, feedback, applications, admin
- [ ] Add API logging/errors to backend functions (via logger.js)
- [ ] Trust score recalculation triggers (per user or bulk)
- [ ] Begin connecting /utils/api.js for shared frontend fetch logic

---

## ✨ Wishlist

- [ ] Real-time site dashboard (e.g. active jobs, users online)
- [ ] Token/coin integration (reward system)
- [ ] Contract system (scheduled roles + repeat jobs)
- [ ] Subscriptions (Basic vs Pro users)
- [ ] Photo + video gallery (media permissions)
- [ ] Private notes on profiles (for personal tracking)
- [ ] Profile verification request/review
- [ ] Kink matcher (compatibility checker)
- [ ] Job clone/repost option
- [ ] Interest/skill tagging + search
- [ ] User promotion/suspension system (admin and mod handling)
- [ ] Badge viewer + gifting logic
- [ ] Trust & reputation scoring dashboard
- [ ] Seeder: generate full test environment (Doms, Subs, jobs, feedback)
- [ ] Admin toggle: enable/disable user accounts
- [ ] Add profile audit score & completeness logic
- [ ] Trust/reputation breakdown on public profile view
- [ ] Kink history and usage stats per user

---

# 🪙 Economy Milestones

## 1: Coin Foundation

- [ ] User `coins` field on backend
- [ ] Admin DevTool: Add coins to user
- [ ] Coins visible on user profile
- [ ] Coins deducted on auction or contract use

## 2: Microtransaction Hooks

- [ ] Badge gifting requires coins
- [ ] Feedback unlock boosts trust with coins
- [ ] Kink feature unlocks for subs/dom based on coins
- [ ] Advanced profiles (media, highlight) cost coins

---

# 🔨 Contract System Milestones

## Core Contract Structure

- [ ] Contract schema created
- [ ] Contracts linked to Job OR directly created from user profiles
- [ ] Contract includes start, end, frequency, repeat
- [ ] Contract includes coin payments or reward
- [ ] Trust score tied to contract performance

## Contract User Interface

- [ ] Doms can offer a contract from profile or job
- [ ] Subs can view offered contracts and accept/reject
- [ ] Mutual consent required to activate contract
- [ ] In-progress contract view (dom/sub dashboards)
- [ ] Feedback available at conclusion of contract
- [ ] Early termination / cancelation reasons tracked

---

# 🏁 Auction Milestones

## Auction Core

- [ ] Auction schema (title, description, image, start/end time)
- [ ] Start bid, current bid, highest bidder
- [ ] Coins deducted from bidder on winning
- [ ] Dom-only auction creation
- [ ] Sub-only auction participation

## UI / Experience

- [ ] Countdown timer
- [ ] Bid history shown
- [ ] Auto-bid detection
- [ ] Limit max bid per user
- [ ] Hide/Show auction from public job board

---

🧪 Dev-Only Tools

- [ ] Test user creator
- [ ] Auto application + job links
- [ ] Purge buttons for test cycles
- [ ] Seed fake feedbacks (Dom/Sub role pairings)
- [ ] Rebuild trust calculation manually (per user or system-wide)



## 👤 User Identity & Role Handling — Solo Dev Checklist [x]

---

### 🧩 BACKEND FIRST — STRUCTURE & API [x]

#### 🧱 1. Mongo Schemas & Data Models [x]

- [x] Create `SharedProfile` model:
  - `displayName`, `avatar`, `bio`, `rolesAvailable`, `reputation`, `gallery`
- [x] Update `User` model:
  - Add `role`, `sharedProfileId`, `linkedAccountId`, `subscription`, `status`
  - Add `devWallet`: `{ balance: Number, isDev: Boolean }`
- [x] Add `actingAs` field to:
  - Applications
  - Feedback
  - Job posts

#### 🛂 2. Auth & Signup Flow [x]

- [x] Create Dom/Sub role-specific signup routes
- [x] Create onboarding fee logic (£1 initial payment)
- [x] Create mock payment processor for dev mode
- [x] Middleware to charge dev wallet or bypass in non-production
- [x] Auto-create `SharedProfile` on signup
- [x] Add `verifyEmail` + ID flow (even basic stub to start)
- [x] Prevent direct opposite-role signup (require upgrade route)

#### 💳 3. Subscription & Upgrade Logic [x]

- [x] Define `subscription` object in `User`:
  - `basePlan`, `isSwitchUnlocked`, `billingStatus`, `renewalDate`
- [x] Build `/api/upgrade-role` endpoint:
  - Creates linked opposite-role account
  - Updates `rolesAvailable` in shared profile
- [x] Charge switch upgrade fee (real or mock)
- [x] Create middleware `hasAccessToRole(role)` for backend gating

#### 🔶 3(b) — Checklist [x]
- [x] Add "Voyeur" to User.role enum
- [x] Add isVoyeurRestricted: true/false logic to hasAccessToRole
- [x] Create /register/voyeur route
- - Charges £1 onboarding fee (via chargeDevWallet)
- - Grants read-only access
- [x] Update /register/dom, /sub, /switch to skip onboarding fee (full subscription = verified)
- [x] Add getAvailableRoles() utility for centralized frontend use
- [x] Allow Voyeurs to upgrade to Dom/Sub/Switch via /upgrade-role
- [x] Add createTestUser({ role: 'Voyeur' }) to DevTools
- [x] Verify role-based access enforcement across Jobs, Applications, Feedback

#### 🔄 4. Role Mode & Behavior Tagging [x]

- [x] Middleware to track current `actingAs` (from token/session)
- [x] Add backend guards to:
  - Prevent self-application
  - Prevent feedback to self
- [x] Update feedback/jobs/apps to store `actingAs` on create

#### 🧯 5. Role Removal & Suspension [x]

- [x] Create `/api/remove-role` to soft-disable Dom/Sub account
- [x] Update `SharedProfile.rolesAvailable` and `archivedRoles`
- [x] Ensure soft-deleted roles keep all past activity
- [x] Add admin flagging or force-lock logic
- [x] Add toggle in AdminDevTools to simulate downgrade to Voyeur

---

### 🎨 FRONTEND SECOND — UI & UX [ ]

#### 🖼️ 6. Profile Interface [x]

- [x] Build `ProfileOverview.jsx` (uses `sharedProfile`)
  - Shows displayName, avatar, bio, rolesAvailable
- [x] Show Switch toggle (only if both roles present)
- [x] Add feedback tabs: "As Dom" / "As Sub"
- [x] Add upgrade call-to-action (if only one role exists)
- [x] Add frontend logic to detect role: Voyeur and show upgrade CTA

#### 💳 7. Subscription Panel [x]

- [x] Build `SubscriptionSettings.jsx`
  - Show base plan + upgrade button if Switch not active
- [x] Build upgrade modal for “Add Opposite Role”
- [x] Display locked state if plan expired (`billingStatus !== 'active'`)
- [x] Automatically downgrade lapsed subscribers to Voyeur
- [x] Show devWallet balance (if in dev)

#### 💳 7(b). Transaction Logging & Dev Wallet Flow [x]
Backend: Models & Routes
- [x] Create Transaction model
- - Fields: user_id, type, amount, currency, status, source, note, created_at
- - Types: upgrade, topup, dev-credit, stripe-charge, admin-adjustment, etc.
- [x] Create route: GET /api/transactions/user/:id
- [x] Add POST /api/devtools/top-up-wallet (for dev-only wallet credits)
- [x] Add transaction creation logic to /upgrade-role controller when using devWallet
- [x] Store dev-only top-ups as type: dev-credit, status: complete
- [x] Deduct simulated payments as type: upgrade, source: devWallet, etc.
- [x] Enforce wallet balance check before upgrade
- [/] Enrich User.devWallet with an embedded transactionCount or metadata?
- [x] Build TransactionHistory.jsx (user-only)
- - Lists past transactions (date, type, amount, status)
- - Color codes or tags for dev-mode entries
- [x] Add a [Top Up Dev Wallet] button (only if isDev === true)
- - Calls /api/devtools/top-up-wallet
- - Refreshes user state + wallet balance + adds transaction
- [/] Integrate transaction fetch into SubscriptionSettings.jsx or dashboard

#### 🔄 8. ActingAs Mode Toggle [x]

- [x] Add toggle to header: “Acting as: [Dom ▼]”
- [x] Store actingAs in global context or hook
- [x] Conditionally render tabs, job actions, sidebar content

#### 🧯 9. Role Retirement (Frontend) [x]

- [x] Add “Retire This Role” button in settings
- [z] Confirm and trigger `/remove-role`
- [z] Update UI to reflect removed role (read-only)

#### 🌐 10. Public Profile Display [x]

- [x] Create `/profile/:displayName` route
  - Shows bio, gallery, reputation
  - Tabs by role (Dom/Sub)
  - Badges or flags (optional, future)

















## Admin Integration - [ ]
Full upgrade and restructuring of Admin accounts, visibility, permissions, and dashboard behavior.

### 1: Admin Role & Schema Foundation - [x]
- [x] Replace isAdmin: true with role: 'Admin'
- [x] Add isOwner: true flag to one protected root admin
- [x] Migrate existing admins to use role: 'Admin'
- [x] Update login logic to exclude Admins from user-only areas

### 2: Admin Profile Infrastructure - [x]
- [x] Create AdminProfile model (distinct from SharedProfile)
- [x] Add adminProfileId ref to User schema
- [x] Display admin profile to other admins inside AdminDirectory

### 3: Admin Permissions Framework - [x]
- [x] Add permissions array to AdminProfile
- [x] Sample permissions: canDeleteUsers, canCreateAdmins, canSuspendContent
- [x] Use granular permission checks in all sensitive routes/actions
### 3b: Controller Modularization - [ ]
- [x] Strip all functions from controller files in to the own help files
- [ ] Refactor all *Controller.js to match the new help function structure

### 4: Admin Creation & Security - [ ]
- [ ] Block public-facing creation of Admin accounts
- [ ] Build secure admin creation form (only by isOwner or canCreateAdmins)
- [ ] Add placeholder 2FA logic (expandable later)
- [ ] Ensure unique username/email validation for Admins

### 5: Admin Visibility & User Separation - [ ]
- [ ] Hide Admins from user-facing content, public profiles, job listings, etc.
- [ ] Admins cannot apply for jobs or interact with user-side site logic
- [ ] Rename “Manage Users” → Accounts Management
- [ ] Add tabs: Users, Admins with filters for each

### 6: Admin Messaging System Prep - [ ]
- [ ] Allow Admin-to-Admin internal messages
- [ ] Allow Admin-to-User contact initiation
- [ ] Block unsolicited User-to-Admin messages (must be in response)

### 7: Admin Dashboard Expansion - [ ]
- [ ] Build left sidebar (stats, alerts, tools)
- [ ] Retain sticky Header/Footer, but remove Dom/Sub UI
- [ ] Display admin profile contact at top left for logged-in admin

### 8: Multi-Owner Delegation - [ ]
- [ ] Allow isOwner: true to grant tiered permissions to trusted Super Admins
- [ ] Prevent deletion of isProtected: true Admins
- [ ] Add audit trail for admin actions like create/delete admin



















### Audit Logging & Read-Only Impersonation Framework - [ ]
Build a full-featured audit trail and impersonation-safe viewer system for long-term transparency, abuse tracking, and admin accountability.

#### 🔐 Core Model & Logging Architecture - [ ]
- [ ] Create `AuditLog` model with fields:
  - actorId (ObjectId)
  - action (String: e.g., "login", "deleteUser", "submitFeedback")
  - targetId (ObjectId, optional)
  - route (String: original path accessed)
  - ipAddress (String)
  - userAgent (String)
  - metadata (Mixed: JSON payload with relevant props)
  - timestamp (auto)
- [ ] Create helper: `logAuditEvent(req, { action, targetId?, metadata? })`
- [ ] Call helper from all sensitive backend actions (auth, job delete, forceVoyeur, feedback moderation, etc.)

#### 👤 Per-User Audit Levels - [ ]
- [ ] Add `auditLevel` to User schema: "basic" | "standard" | "full"
- [ ] Define tiered logging:
  - basic → login/logout, top-ups, role switch
  - standard → job interactions, feedback, edits
  - full → every API action, UI transition, and tracked click
- [ ] Add `process.env.AUDIT_LOG_DEFAULT_LEVEL` fallback for site-wide default
- [ ] Extend `logAuditEvent` to respect audit level tiers before logging

#### 👁️ Read-Only Impersonation System - [ ]
- [ ] Add admin-only button to "Act As User (Read-Only)"
- [ ] Store impersonationStart and impersonationStop in AuditLog
- [ ] All impersonated actions are still read-only (no DB writes)
- [ ] Admin’s own ID is preserved in all audit logs while impersonating
- [ ] UI clearly shows “🕵️ Viewing as [username] — Read Only”
- [ ] Add `req.impersonating` context to all relevant routes

#### 🛠️ Admin UI for Audits - [ ]
- [ ] Build Admin-only Audit Viewer tab
- [ ] Filter logs by actor, action, target, route, or date
- [ ] Group by session or IP for behavioral insight
- [ ] View raw log (JSON viewer)
- [ ] Add “Export CSV” feature for reports or audits

#### 🔄 Future Enhancements - [ ]
- [ ] Optional `useAuditLog()` frontend hook to track UI button clicks or page visits
- [ ] Enable real-time audit event stream to admin dashboard via WebSocket
- [ ] Allow `isOwner` to flag certain logs as non-deletable
- [ ] Add audit export summary to banned user reports

