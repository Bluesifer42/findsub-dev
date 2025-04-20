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

---

# 🪙 Economy Milestones

This document tracks planned features and logic for the Coins-based economy system within RealSubs.

## Phase 1: Coin Foundation

- [x] User `coins` field on backend
- [ ] Admin DevTool: Add coins to user
- [ ] Coins visible on user profile
- [ ] Coins deducted on auction or contract use

## Phase 2: Microtransaction Hooks

- [ ] Badge gifting requires coins
- [ ] Feedback unlock boosts trust with coins
- [ ] Kink feature unlocks for subs/dom based on coins
- [ ] Advanced profiles (media, highlight) cost coins

---

# 🔨 Contract System Milestones

This document tracks features related to the contract-based workflow for ongoing or scheduled Dom/Sub arrangements.

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

This document tracks the development of the Coin-based auction system used for bidding on tasks, jobs, or submissive time slots.

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
