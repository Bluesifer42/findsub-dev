# 🖤 FindSub / RealSubs Platform

**Connect, Engage, and Explore – Your BDSM Service Hub**

---

## 🔍 Overview

FindSub is a private, role-based BDSM platform designed for the Switch, Sub, and Dom community. It combines verified user profiles with a flexible job/task posting system. The site is sleek, professional, and built with safety, discretion, and usability in mind.

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
git clone https://github.com/Bluesifer42/findsub-dev.git
cd findsub-dev
