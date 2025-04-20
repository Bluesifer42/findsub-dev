# 💼 Real Subs: Contract Lending Milestones

Contracts allow Doms to offer loans to Subs, who must repay weekly with interest. The system uses Coins and mimics real financial enforcement with feedback and trust score integration.

---

## ✅ Phase 1: Contract Creation

- [x] Doms create contracts in £
- [x] 1£ = 1 Coin conversion on submit
- [x] Fixed interest rate (Low/Med/High)
- [x] Setup fee (+10%) added up front
- [x] Repayment schedule: weekly with compounding interest

---

## ⚠️ Phase 2: Risk & Default Handling

- [x] Missed payment = £20 fee (converted), added to balance
- [x] Missed payment extends contract by 1 week
- [x] 3 missed payments = Default status
- [x] Block users in Default from taking new contracts
- [ ] Add Default contract list (user + admin views)

---

## 💸 Phase 3: Payments & History

- [x] Automatic weekly deductions from Sub balance
- [x] Early repayment: +10% fee + 1 week interest
- [x] Rejected contracts stored
- [x] Contract logs:
  - [x] Weekly amount
  - [x] Interest
  - [x] Principal
  - [x] Remaining balance

---

## 🤝 Phase 4: Feedback & Trust

- [x] Feedback required on completed contracts
- [ ] Feedback history shown on profile
- [ ] High-trust contracts unlock advanced badge tiers
- [ ] Admins can adjust or override contracts manually
