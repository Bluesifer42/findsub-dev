# 💸 Real Subs: Coin Economy Milestones

This file tracks the integrated **Coin-based economy** system for Real Subs, covering both **Auctions** and **Contracts**. These features empower Doms to monetize services and enforce commitment through economic mechanisms and feedback.

---

## ✅ Phase 1: Core Design & Logic

- [x] Define role-based control (Dom-only creation for auctions & contracts)
- [x] Outline coin transaction logic and bid limits
- [x] Establish interest calculation & compounding rules
- [x] Add fee structures and penalties for missed payments
- [x] Design full feedback flow linked to economic actions

---

## ⚙️ Phase 2: Auction System

- [x] Allow Doms to create auction listings with scheduled start/end
- [x] Enable Subs to bid between 1–10 Coins per auction
- [x] Deduct 1 Coin per valid bid
- [x] Randomized writing challenges per bid
- [x] Enforce 60-minute per-auction cooldown
- [x] Show live countdown and price tracker
- [x] Track bid history with timestamps (no usernames)
- [x] Prevent copy/paste and enforce human input
- [ ] Add notification toggle for final bid opportunity
- [ ] Add cancellation and editing (only before auction starts)

---

## 💰 Phase 3: Contract System

- [x] Allow Doms to post contracts in £ (converted to Coins at 1:1)
- [x] Weekly compounding interest (Low/Med/High tiers)
- [x] Setup fee (+10%), early repayment fee (+10% + 1 week interest)
- [x] Missed payment fee (£20 converted to Coins)
- [x] Automatically extend contract 1 week on missed payment
- [x] Block new contracts after 3 missed payments (Default status)
- [x] Track full payment history (amount, principal, interest, remaining)
- [ ] Add "Contracts in Default" view (user + admin)
- [ ] Admin override tools for contract adjustments

---

## 📦 Phase 4: Feedback & Integration

- [x] Require feedback exchange on completed auctions/contracts
- [x] Sync with Trust Score and Badge system
- [ ] Show economic feedback history on user profiles
- [ ] Auto-flag repeated defaulting users

---

## ⏭️ Future Additions

- [ ] Contract variations: task-based vs open-loan
- [ ] Allow Sub-initiated contract requests (Dom approval required)
- [ ] Coin balance refill (paid tiers or earned rewards)
- [ ] Dynamic auction badges or rewards
