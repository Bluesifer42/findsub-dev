# 🛠️ RealSubs Development Milestones

_This document tracks the current, upcoming, and requested feature enhancements for the FindSub / RealSubs BDSM platform._

---

## 🧩 Core System Functionality

| Feature                                        | Status | Notes                                               | To Do |
|------------------------------------------------|:------:|-----------------------------------------------------|-------|
| User registration & login                      | ✅     | Fully implemented                                   | -     |
| Age restriction (18+)                          | ✅     | Age check on registration                           | -     |
| Role system (Dom, Sub, Switch)                 | ✅     | Switches can post/apply                             | -     |
| Role switching rules                           | ✅     | 1 free switch/year, paid after that                 | -     |
| Email verification placeholder                 | ✅     | Placeholder functional                              | -     |
| Mobile verification placeholder                | ✅     | Placeholder functional                              | -     |
| Profile editing                                | ✅     | Editable via profile page                           | **Enhance:** Expand profile editing to include profile picture upload, a public photo album, and additional tabs (e.g., Completed Jobs with feedback, Basic Info, Media). Integrate address storage with an option to reveal only rough location for job filtering. |
| Granular profile fields (experience, limits)   | ✅     | Saved and editable                                  | **Enhance:** Change interests and limits from comma-separated text to checkboxes to enable filtering and clearer display. |
| Reputation system                              | 🔧     | Based on feedback from completed jobs               | **Enhance:** Expand into a granular rating system. For example, have Doms rate factors such as obedience, cleaning ability, cleanliness, smartness, boot licking; and Subs rate strictness, punishment severity, workload, fun, etc. |
| Profile picture upload                         | ❌     | Planned for v2                                      | **Develop:** Implement secure image upload functionality and a photo album for public viewing. |
| Certificate upload                             | ❌     | Support + mod validation planned                    | -     |
| Auto-validation of certificates                | ❌     | Depends on 3rd party service                        | -     |

---

## 📦 Jobs System

| Feature                                | Status | Notes                                               | To Do |
|----------------------------------------|:------:|-----------------------------------------------------|-------|
| Job creation form                      | ✅     | With all required fields                            | -     |
| Job categories (hardcoded)             | ✅     | Examples: Chauffeur, Boot Licker, etc.              | -     |
| Job start date, time, min duration     | ✅     | Shown in UI                                         | -     |
| Expiry date for job                    | ✅     | Auto-expiring logic in place                        | -     |
| Recurring job support                  | 🔧     | Partially handled manually                          | -     |
| Cancel job                             | ✅     | Can cancel before job start                         | -     |
| Edit / Re-list job                     | ✅     | Opens in `/jobs/edit/:id`                           | -     |
| Job templates                          | ❌     | Planned template system                             | **Develop:** Create reusable job templates for rapid reposting. |
| Job visibility logic                   | ✅     | Filled jobs shown for 7 days                        | -     |
| Specific user request by Dom           | ❌     | Not currently available                             | **Develop:** Add capability for Doms to search/browse profiles and directly invite or assign jobs to specific users. |
| Compensation input                     | ❌     | Currently a free text input                         | **Develop:** Replace free text input with a monetary value field (in £) that clearly indicates the payment direction (who is to be paid) plus checkboxes for extras (e.g., coffee, flowers, chocolates, wine). |

---

## 🤝 Applications & Feedback

| Feature                                        | Status | Notes                                               | To Do |
|------------------------------------------------|:------:|-----------------------------------------------------|-------|
| Apply / express interest                       | ✅     | For Subs/Switches only                              | -     |
| Cover letter with application                  | ✅     | Optional message field                              | -     |
| Poster views applicants                        | ✅     | With profile and comments                           | -     |
| Select applicant                               | ✅     | Locks job from further applications               | -     |
| Leave feedback (poster → sub)                  | ✅     | Via completed job history                           | -     |
| Leave feedback (sub → poster)                  | ✅     | Via completed job history                           | -     |
| Public feedback on profile                     | ✅     | Stars/comments visible on profiles                | -     |
| One feedback per job per user                  | ✅     | Enforced server-side                                | -     |
| Enhanced Reputation/Rating breakdown           | ❌     | Current system uses a basic star rating system      | **Enhance:** Transition to a more detailed rating system with multiple criteria for each role. |

---

## 🧭 Navigation & UX

| Feature                                | Status | Notes                                             | To Do |
|----------------------------------------|:------:|---------------------------------------------------|-------|
| Sticky header & footer                 | ✅     | Always visible                                    | -     |
| Collapsible right-side nav             | ❌     | Planned sidebar toggle                            | **Develop:** Implement a collapsible sidebar for easier navigation. |
| Role-based dashboards                  | ✅     | Clean separation based on user role               | -     |
| Job section with tabs                  | ✅     | Dynamic per role                                  | **Enhance:** Consider adding tabs within the profile page (e.g., Basic Info, Completed Jobs, Photos). |
| Tab: Job Board                         | ✅     | Shows public jobs                                 | -     |
| Tab: Manage Jobs                       | ✅     | For posters (Doms/Switches)                       | -     |
| Tab: My Jobs / Active Jobs             | ✅     | For applicants                                    | -     |
| Tab: Job History                       | ✅     | Completed + failed jobs                           | -     |
| Dark mode toggle                       | ❌     | Nice-to-have for v2                               | **Develop:** Implement a dark mode option to improve usability on mobile. |
| Mobile responsiveness                  | 🔧     | Base layout works, fine-tuning needed             | **Enhance:** Optimize mobile views, particularly for new profile enhancements (photo albums, refined checkboxes, etc.). |

---

## 💳 Payments & Monetization

| Feature                                | Status | Notes                                               | To Do |
|----------------------------------------|:------:|-----------------------------------------------------|-------|
| Membership tiers (Basic / Pro / Elite) | ❌     | Planned access system                               | **Plan:** Define feature gating by membership and design tier benefits. |
| Stripe integration (on-site payment)   | ❌     | Placeholder now                                     | **Plan:** Begin integration work with the Stripe API. |
| Lock features behind membership        | ❌     | e.g., access to enhanced feedback or applications   | **Develop:** Determine which features are premium and implement access controls. |
| Transaction logs                        | ❌     | Currently, logs are off-site and internal only      | **Develop:** Create an in-app transaction log for user transparency. |
| Mod/Admin roles & promotion             | ✅     | Admins via backend only                             | -     |
| Moderator-reviewed content              | ✅     | No auto-filtering needed                            | -     |
| Admin tools for job/user management     | ❌     | Basic admin dashboard required                    | **Develop:** Build a simple dashboard for admins to manage users and jobs. |

---

## 🌍 Safety, Legal, and Trust

| Feature                                | Status | Notes                                             | To Do |
|----------------------------------------|:------:|---------------------------------------------------|-------|
| Age verification                        | ✅     | Enforced on signup                                | -     |
| Certificate validation                  | ❌     | Manual by moderators for now                      | -     |
| End-to-end encrypted messages           | ✅     | Enforced for private chats                        | -     |
| Secure Messaging Service                | ❌     | No secure messaging module in place               | **Develop:** Implement a secure messaging system that logs conversations, with admin oversight for moderation if needed. |
| Anonymous contact toggle                | ❌     | Optional for later phases                         | **Plan:** Develop settings for anonymous contact visibility. |
| Clear terms & guidelines                | ❌     | Static pages required                             | **Develop:** Create static pages for terms, guidelines, and privacy policies. |
| GDPR / data policy compliance           | ❌     | Need option for data export and deletion          | **Develop:** Incorporate features for data management in compliance with GDPR and local data policies. |

---

## 💡 Suggested Enhancements

| Feature                                | Priority | Notes                                             | To Do |
|----------------------------------------|:--------:|---------------------------------------------------|-------|
| Job bookmarking/favorites              | ⭐      | Let users favorite job posts                      | **Develop:** Enable a bookmarking function for jobs. |
| Push/email notifications               | ⭐      | Alerts for job applications, selections, etc.     | **Develop:** Integrate a push/email notification system for important events. |
| "Draft" job state                      | ⭐⭐     | Save job without posting immediately              | **Develop:** Allow job postings to be saved as drafts for later editing and posting. |
| Reputation badges                      | ⭐      | Auto-awarded based on performance                 | **Plan:** Define criteria and badge system; integrate badges into user profiles. |
| Dynamic job expiry reminders           | ⭐⭐     | Reminders for job expiration for posters          | **Develop:** Add reminder notifications as jobs approach expiry. |
| AI spam detection                      | ⭐      | Optional content screening                        | **Explore:** Integrate basic AI-based spam detection for user content. |
| Template-based job posting             | ⭐⭐     | Save and reuse common job formats                 | **Develop:** Create a module for saving and reusing job templates to reduce posting time. |

