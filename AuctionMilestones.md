# 🛎️ Real Subs: Auction System Milestones

Auctions allow Doms to post one-time listings for bidding using Coins. This milestone log tracks the feature rollout and tuning for fairness, user engagement, and anti-abuse.

---

## ✅ Phase 1: Bidding Engine

- [x] Doms can create new auctions with scheduled start & end
- [x] Subs can bid 1–10 Coins (raises current price)
- [x] 1 Coin deducted per successful bid
- [x] Bid only once per auction per 60 minutes
- [x] Enforce cooldowns silently via disabled buttons

---

## ✍️ Phase 2: Writing Challenge System

- [x] Random writing challenge per bid
- [x] New challenge provided after 60 mins if failed
- [x] Copy/paste disabled
- [x] Keystroke timing detection enabled
- [x] Speech-to-text blocked

---

## 🛠️ Phase 3: Auction Management

- [x] Auctions sorted by ending soonest
- [ ] Auction cancellation enabled before start
- [ ] Editing allowed only before start time
- [x] Winning logic = highest bid closest to end time
- [x] Only winner gets post-auction notification

---

## 📈 Phase 4: Logs & Transparency

- [x] Display current auction price and time remaining
- [x] Bid logs with price and timestamp (no user info)
- [x] View completed auctions in user history
- [x] Display auction summary on user dashboard

---

## 📦 Planned Features

- [ ] “Last bid notification” toggle
- [ ] Auction tags or categories
- [ ] Live bidding heat indicators
- [ ] Winner auto-feedback reminder
