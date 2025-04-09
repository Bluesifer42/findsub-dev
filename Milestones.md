 RealSubs Development Milestones
This file tracks the major development goals, their current status, and proposed features. Update this as features are completed or adjusted.

🧩 Core System Functionality
Feature	Status	Notes
User registration & login	✅	Fully implemented
Age restriction (18+)	✅	Age check on registration
Role system (Dom, Sub, Switch)	✅	Switches can post/apply
Role switching rules	✅	1 free switch/year, paid after that
Email verification placeholder	✅	Placeholder functional
Mobile verification placeholder	✅	Placeholder functional
Profile editing	✅	Editable via profile page
Logout system	✅	Functional from header
Granular profile fields (experience, limits, etc.)	✅	Saved and editable
Public profile view	✅	Accessible via username link
Reputation system	✅	Based on feedback from completed jobs
Profile picture upload	❌	Planned for v2
Certificate upload	❌	Support + mod validation planned
Auto-validation of certificates	❌	Depends on 3rd party service
📦 Job System
Feature	Status	Notes
Job creation form	✅	With all required fields
Job categories (hardcoded)	✅	Chauffeur, Boot Licker, etc.
Job start date, time, min duration	✅	Shown in UI
Expiry date for job	✅	Auto-expiring logic in place
Recurring job support	🔧	Partially handled manually
Cancel job	✅	Before job start
Edit/re-list job	✅	Opens in /jobs/edit/:id
Job templates	❌	Planned template system
Job visibility logic (e.g., 1 week after filled)	✅	Filled jobs shown for 7 days
Show poster’s name & profile link	✅	On every job post
Show selected applicant after fill	✅	Role marked as filled
Job search / filter	❌	Category/date filters planned
🤝 Applications & Feedback
Feature	Status	Notes
Apply/express interest	✅	Subs/Switches only
Cover letter with application	✅	Optional message field
Poster views applicants	✅	With profile and comment
Select applicant	✅	Locks job from further applicants
Leave feedback (poster → sub)	✅	After job completion
Leave feedback (sub → poster)	✅	Via completed job history
Public feedback on profile	✅	Stars/comments visible
One feedback per job per user	✅	Enforced server-side
🧭 Navigation & UX
Feature	Status	Notes
Sticky header & footer	✅	Always visible
Collapsible right-side nav	❌	Planned sidebar toggle
Role-based dashboards	✅	Clean separation
Job section with tabs	✅	Dynamic per role
Tab: Job Board	✅	Shows public jobs
Tab: Manage Jobs	✅	For posters (Doms/Switches)
Tab: My Jobs / Active Jobs	✅	For applicants
Tab: Job History	✅	Completed + failed jobs
Dark mode toggle	❌	Nice-to-have for v2
Mobile responsiveness	🔧	Base layout works, fine-tuning needed
💳 Payments & Monetization
Feature	Status	Notes
Membership tiers (Basic / Pro / Elite)	❌	Planned access system
Stripe integration (on-site payment)	❌	Placeholder now
Lock features behind membership	❌	e.g., feedback, applications
Transaction logs	❌	Between users (off-site), site logs internal only
Mod/Admin roles & promotion	✅	Admins via backend only
Moderator-reviewed content	✅	No auto-filtering needed
Admin tools for job/user management	❌	Will need basic admin dashboard
🌍 Safety, Legal, and Trust
Feature	Status	Notes
Age verification	✅	Enforced on signup
Certificate validation	❌	Manual by moderators for now
End-to-end encrypted messages	✅	Enforced for private chats
Anonymous contact toggle	❌	Optional visibility later
Clear terms & guidelines	❌	Needs static pages
GDPR / data policy compliance	❌	Export/delete user data option required
💡 Suggested Enhancements
Feature	Priority	Notes
Job bookmarking/favorites	⭐	Let users favorite posts
Push/email notifications	⭐	When selected, new jobs, etc.
"Draft" job state	⭐⭐	Save job without posting yet
Reputation badges (e.g. Top Dom, Trusted Sub)	⭐	Auto-awarded on performance
Dynamic job expiry reminders	⭐⭐	For posters
AI spam detection (basic)	⭐	Optional content check
Template-based job posting	⭐⭐	Save common formats