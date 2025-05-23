# 🖤 FindSub / RealSubs Platform

**Connect, Engage, and Explore – Your BDSM Service Hub**

---

## 🧩 Role Summary

- **Dom**: Posts jobs, selects applicants, leaves feedback, can gift badges.
- **Sub**: Applies to jobs, completes tasks, leaves feedback, builds trust.
- **Switch**: Can do both; can switch once per year for free, else must upgrade.
- **Admin**: Full site control — can create/edit/delete users, manage feedback and jobs, assign moderator status, and access DevTools. Cannot engage in Dom/Sub activities.
- **Moderator**: Reviews and moderates content (jobs, feedback, media). Can suspend content and flag users. Participates as Dom or Sub. Cannot delete users or access DevTools.

## 🔍 Overview

FindSub is a private, role-based BDSM platform designed for the Switch, Sub, and Dom community. The site aims to provide a safe and reputationally accountable space for adult role-based engagements and combines verified user profiles with a flexible job/task posting system. The site is sleek, professional, and built with user safety, discretion, and usability in mind.

---

## 🔍 Folder Snapshot

findsub-dev/
├── client/                      # React frontend
│   ├── public/
│   └── src/
│       ├── components/          # Reusable UI components
│       ├── pages/               # Page-level components
│       ├── utils/               # Utility functions and API handlers
│       ├── App.jsx
│       └── index.js
├── server/                      # Express backend
│   ├── controllers/             # Route handler functions
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # Express route definitions
│   ├── utils/                   # Utility functions (e.g., logger.js)
│   ├── server.js                # Entry point for the backend
│   └── config/                  # Configuration files (e.g., database connection)
├── README.md                    # Project overview and setup instructions
├── Milestones.md                # Development milestones and progress tracking
├── package.json                 # Project metadata and dependencies
└── .gitignore                   # Specifies files to ignore in Git

---

## 🛠️ Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | React.js (Vite)       |
| Backend      | Node.js + Express     |
| Database     | MongoDB (Mongoose)    |
| Dev Platform | VSCode + Live Server + VirtualBox Debian server |
| Auth & State | LocalStorage (JWTs in future) |
| Versioning   | Git + GitHub          |

---

## 🧩 Current Features

### ✅ User System
- Registration/login with role-based control (Dom, Sub, Switch)
- Age-restricted (18+), email and phone placeholders
- Granular profile data: interests, experience, limits, gender (male/female only)
- Public profile view with username linking

### ✅ Dashboard
- Custom dashboards for Dom, Sub, and Switch roles
- Persistent user sessions (stored in localStorage)
- Logout system
- Role-specific navigation panels

### ✅ Jobs System
- Doms & Switches can post job/task opportunities
- Subs & Switches can apply
- Manual selection by job poster
- Categories: Chauffeur, Domestic Cleaning, Boot Licker, etc.
- Auto-expiring job system
- Minimum duration, start time, and start date
- Cancelled jobs editable and re-listable
- Completed jobs stay visible for 1 week after fulfillment

### ✅ Job Application Flow
- Cover letter/notes from applicants
- Applications viewable by posters
- Role/status-based job visibility
- Job lifecycle statuses: Open, Filled, Completed, Failed, Cancelled

### ✅ Feedback & Reputation
- Posters and Applicants can leave feedback after a job
- 5-star rating system with comments
- Feedback shown on job listings and profiles
- Reputation score updated automatically

### ✅ Public Features
- Feedback is viewable for completed jobs
- Job creator usernames link to public profiles
- Re-listing cancelled jobs launches in the editor

---

## 🧪 Development Notes

- All development is currently offline via local server
- MongoDB Atlas used with private credentials
- Placeholder verification for phone/email implemented (3rd-party validation coming soon)
- Future integrations: Stripe (for membership tiers), real-time messaging, template jobs

---

## 🧭 Routes Overview

### Frontend

| Path              | Description                       |
|-------------------|-----------------------------------|
| `/login`          | Login screen                      |
| `/register`       | Registration with restrictions    |
| `/dashboard`      | Role-specific dashboard switch    |
| `/jobs`           | Public job listings               |
| `/jobs/edit/:id`  | Re-list job (edit cancelled)      |
| `/manage`         | Job management (Doms/Switches)    |
| `/profile/:id`    | Public profile viewer             |

### Backend

| Endpoint                  | Purpose                        |
|---------------------------|--------------------------------|
| `POST /api/register`      | Create user                    |
| `POST /api/login`         | Authenticate user              |
| `POST /api/jobs`          | Create a job                   |
| `POST /api/jobs/update`   | Update/re-list a job           |
| `POST /api/jobs/select`   | Select applicant               |
| `POST /api/jobs/status`   | Update job status              |
| `POST /api/feedback`      | Feedback from Sub              |
| `POST /api/feedback/poster` | Feedback from Dom           |
| `GET /api/jobs`           | Fetch jobs (filtered)          |
| `GET /api/my-jobs/:id`    | Jobs user was hired for        |
| `GET /api/jobs/history/:id` | Completed jobs                |
| `GET /api/feedback/user/:id` | User feedback               |

---

## 🧑‍💻 Local Dev Setup

1. Clone the repo:

```bash

## 1. Clone Repo
git clone https://github.com/Bluesifer42/findsub-dev.git
cd findsub-dev

## 2. Install dependencies:
cd findsub-client
npm install
cd ../findsub-server
npm install


## 3. Create .env inside findsub-server/:
MONGO_URI=mongodb+srv://<your Mongo string>


4. Run:

Frontend (React):
cd findsub-client
npm run dev
Backend (API):
cd findsub-server
node server.js


🔮 Coming Soon
Membership system with Stripe (Basic, Pro, Elite)

Template jobs for rapid reposting

Verified certification upload

Media galleries per user

Job filtering, search, and calendar view

End-to-end messaging and document exchange

## 💸 Coin-Based Economy (Upcoming Feature)

Real Subs is expanding with an internal Coin-based economy designed to reward trust, enforce commitment, and create meaningful reputation dynamics.

### 🛎️ Auctions
- **Dom-Created Auctions**: Doms post listings that Subs bid on using Coins.
- **Bid System**: Subs can raise the price by 1–10 Coins per bid. Highest bid closest to auction end wins.
- **Writing Challenges**: Anti-bot challenges must be solved before bidding.
- **Cooldowns**: Users may bid once every 60 minutes per auction.
- **Transparency**: Bid history and live price tracking included.
- **Pre-Start Editing**: Doms can edit or cancel auctions before they begin.

### 💼 Contracts
- **Dom-Offered Loans**: Doms offer contracts in £, auto-converted to Coins.
- **Interest System**: Weekly compounding interest with fixed rate tiers.
- **Penalty Enforcement**: Fees for setup, early repayment, and missed payments.
- **Default Handling**: Contracts move to "In Default" after 3 missed payments.
- **Trust Impact**: Contracts and feedback affect profile trust score and history.

---

> For detailed development progress, see:
> - [EconomyMilestones.md](./EconomyMilestones.md)
> - [AuctionMilestones.md](./AuctionMilestones.md)
> - [ContractsMilestones.md](./ContractsMilestones.md)

Maintained by bluesifer42

🖤 BDSM is about trust, respect, and communication. This platform reflects those values in code.
