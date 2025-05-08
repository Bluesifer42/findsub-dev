// ====================================================================
// 📂 Full File Path & Name: /src/pages/jobs/JobDetail.jsx
// 📌 Purpose: Display details of a selected job, including feedback and applications.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js, /routes/ApplicationRoutes.js, /controllers/ApplicationController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: jobId change, user load, feedback/apply actions
// 🔁 Performs: fetch job details, fetch feedback, apply, retract, delete, status updates
// 🧪 Test Coverage: Unit tests pending, integrated into JobsHub
// 🌐 Environment-Specific Logic: Logs API data in dev
// ⚡ Performance Notes: Renders on demand in-tab inside JobsHub

// - DO NOT EDIT THIS SECTION ======================================

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
// - Uses toast for user-visible errors (via react-hot-toast or react-toastify)
// - Logs errors to console: `[FileName:FunctionName] Error: [message], Payload: [payload]`
// - Avoids alert()/prompt() except in critical cases with justification
//
// 📍 Navigation Standards:
// - React Router <Link> for internal routing
// - Direct route changes use navigate('/path')
//
// 🧪 Testing/Debugging Aids:
// - Console logs: `[FileName DEBUG] [message]`
// - Logs API payloads/responses in development only
//
// 🚨 ESLint / Prettier:
// - Adheres to airbnb style, indentation: 2 spaces (no tabs)
// - Exceptions: `// eslint-disable-line [rule] - [reason]`
//
// 🔒 Security Notes:
// - Sanitizes inputs via `sanitize-html`
// - Prevents XSS via Helmet middleware
//
// 🧰 Behavior Notes:
// - Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import FeedbackForm from './JobFeedbackForm';
import { useUser } from '../../hooks/useUser';
import {
  getJobById,
  getFeedbackForJob,
  getApplicationsForJob,
  applyToJob,
  retractApplication,
  updateJobStatus,
  deleteJob,
  selectApplicant
} from '../../utils/api';
import { toast } from 'react-hot-toast';

function JobDetail({ jobId: propJobId, onClose }) {
  const { jobId: routeJobId } = useParams();
  const jobId = propJobId || routeJobId;

  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [applications, setApplications] = useState([]);
  const [hasApplied, setHasApplied] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [status, setStatus] = useState('');
  const location = useLocation();

  // Fetch job details
  useEffect(() => {
    if (!jobId) return;
    (async () => {
      console.log('[JobDetail DEBUG] Fetching job by ID:', jobId);
      try {
        const { job } = await getJobById(jobId);
        console.log('[JobDetail DEBUG] Job data received:', job);
        setJob(job);
      } catch (err) {
        console.error('[JobDetail] Failed to fetch job:', err);
        toast.error('❌ Failed to load job details.');
        setStatus('❌ Failed to load job details.');
      }
    })();
  }, [jobId]);

  // Fetch feedback and applications
  useEffect(() => {
    if (!user || !jobId) return;
    (async () => {
      console.log('[JobDetail DEBUG] Fetching feedback/applications for job:', jobId);
      try {
        const { feedback } = await getFeedbackForJob(jobId);
        const { applications } = await getApplicationsForJob(jobId);
        const applied = applications.some(app => app.applicant_id._id === user._id);
        console.log('[JobDetail DEBUG] Feedback:', feedback);
        console.log('[JobDetail DEBUG] Applications:', applications);
        console.log('[JobDetail DEBUG] User has applied:', applied);

        setFeedback(feedback);
        setApplications(applications);
        setHasApplied(applied);
      } catch (err) {
        console.error('[JobDetail] Error loading related data:', err);
        toast.error('❌ Error loading feedback or applications.');
      }
    })();
  }, [user, jobId]);

  const handleApply = async () => {
    const confirmed = window.confirm('Do you want to apply for this job?');
    if (!confirmed) return;

    const cover = prompt('Optional: Add a message (or leave blank):');
    if (cover === null) return toast('Application cancelled.');

    try {
      await applyToJob({ jobId, applicantId: user._id, coverLetter: cover.trim() });
      toast.success('✅ Application submitted!');
      setHasApplied(true);
    } catch (err) {
      console.error('[JobDetail] Failed to apply:', err);
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleRetract = async () => {
    if (!window.confirm('Retract your application?')) return;
    try {
      await retractApplication(jobId, user._id);
      toast.success('✅ Application retracted.');
      setHasApplied(false);
    } catch (err) {
      console.error('[JobDetail] Failed to retract application:', err);
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleDeleteJob = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await deleteJob(jobId);
      toast.success('✅ Job deleted.');
      navigate('/jobs');
    } catch (err) {
      console.error('[JobDetail] Delete error:', err);
      toast.error('❌ Error deleting job.');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!window.confirm(`Mark this job as ${newStatus}?`)) return;
    try {
      await updateJobStatus({ jobId, newStatus });
      toast.success(`✅ Job marked as ${newStatus}`);
      window.location.reload();
    } catch (err) {
      console.error('[JobDetail] Status update failed:', err);
      toast.error('❌ Failed to update job status.');
    }
  };

  const handleSelectApplicant = async (applicantId) => {
    if (!window.confirm('Select this applicant for the job?')) return;
    try {
      await selectApplicant({ jobId, applicantId });
      toast.success('✅ Sub selected.');
      window.location.reload();
    } catch (err) {
      console.error('[JobDetail] Failed to select applicant:', err);
      toast.error('❌ Failed to select applicant.');
    }
  };

  const handleFeedbackClick = () => {
    if (!job?.selectedApplicant) return toast.error('No applicant selected yet.');
    setShowFeedbackForm(true);
  };

  const findKinkName = (kinkId) => {
    const sources = [
      ...(job?.requiredKinks || []),
      ...(job?.posterId?.kinks || []),
      ...(job?.selectedApplicant?.kinks || [])
    ];
    const found = sources.find(k =>
      typeof k === 'string' ? k === kinkId :
      k._id?.toString() === kinkId || k.kink?._id?.toString() === kinkId
    );
    return found?.name || found?.kink?.name || kinkId;
  };

  if (isLoading || !job) return <p>Loading job details...</p>;
  if (status) return <p>{status}</p>;

  const isPoster = user?._id === job.posterId._id;

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 border rounded shadow bg-white">      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        {routeJobId && (
          <button
            onClick={() => {
              if (location.key !== 'default') {
                navigate(-1); // ⬅️ go back to the previous tab/route
              } else {
                navigate('/jobs'); // fallback if no history (e.g., direct URL visit)
              }
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Listings
          </button>
        )}
      </div>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Compensation:</strong> {job.compensation}</p>
      {job.requirements && <p><strong>Requirements:</strong> {job.requirements}</p>}
      <p><strong>Category:</strong> {job.category}</p>
      {job.expiresAt && <p><strong>Expires:</strong> {new Date(job.expiresAt).toLocaleDateString()}</p>}
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Posted by:</strong> <Link to={`/profile/${job.posterId._id}`}>{job.posterId.username}</Link></p>

      {job.requiredKinks?.length > 0 && (
        <div className="mt-2">
          <strong>Required Kinks:</strong>
          <ul className="list-disc pl-6">
            {job.requiredKinks.map(k => (
              <li key={typeof k === 'string' ? k : k._id}>
                {typeof k === 'string' ? k : k.name}
                {typeof k !== 'string' && k.description && (
                  <span className="text-sm text-gray-600"> – {k.description}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 space-x-4">
        {user && user.role === 'Dom' && isPoster && (
          <>
            <button onClick={() => navigate(`/jobs/edit/${job._id}`)}>✏️ Edit Job</button>
            <button onClick={handleDeleteJob}>🗑️ Delete Job</button>
            {job.status === 'open' && (
              <button onClick={() => handleUpdateStatus('cancelled')}>Cancel Job</button>
            )}
            {job.status === 'filled' && (
              <>
                <button onClick={() => handleUpdateStatus('completed')}>Mark as Completed</button>
                <button onClick={() => handleUpdateStatus('failed')}>Mark as Failed</button>
              </>
            )}
          </>
        )}

        {user && user.role === 'Sub' && job.status === 'open' && (
          hasApplied ? (
            <>
              <p className="text-green-600 mt-2">✅ You’ve applied for this job.</p>
              <button onClick={handleRetract}>Retract Interest</button>
            </>
          ) : (
            <button onClick={handleApply}>Apply / Express Interest</button>
          )
        )}

        {user && user.role === 'Sub' && job.status === 'completed' && (
          <button onClick={handleFeedbackClick}>Leave Feedback</button>
        )}
      </div>

      {/* Feedback Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Feedback</h3>
        {feedback.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          feedback.map(f => (
            <div key={f._id} className="border-b border-gray-200 py-2">
              <p><strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})</p>
              {f.generalRatings && (
                <>
                  <p><strong>General Ratings:</strong></p>
                  <ul>{Object.entries(f.generalRatings).map(([key, val]) => <li key={key}>{key}: {val} / 5</li>)}</ul>
                </>
              )}
              {f.interestRatings && (
                <>
                  <p><strong>Interest Ratings:</strong></p>
                  <ul>{Object.entries(f.interestRatings).map(([kId, val]) => <li key={kId}>{findKinkName(kId)}: {val} / 5</li>)}</ul>
                </>
              )}
              {f.honestyScore !== undefined && <p><strong>Honesty:</strong> {f.honestyScore} / 5</p>}
              {f.comment && <p><strong>Comment:</strong> {f.comment}</p>}
            </div>
          ))
        )}
      </div>

      {/* Applicants for Dom */}
      {user?.role === 'Dom' && isPoster && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Applicants</h3>
          {applications.length === 0 ? (
            <p>No applicants yet.</p>
          ) : (
            applications.map(app => (
              <div key={app._id} className="border p-4 mb-4 rounded">
                <p><strong>Username:</strong> {app.applicant_id.username}</p>
                <p><strong>Experience:</strong> {app.applicantId.experienceLevel}</p>
                {app.coverLetter && <p><strong>Cover Letter:</strong> {app.coverLetter}</p>}
                {!job.selectedApplicant && (
                  <button onClick={() => handleSelectApplicant(app.applicantId._id)}>✅ Select This Sub</button>
                )}
                {job.selectedApplicant?._id === app.applicantId._id && (
                  <p className="text-green-600">✅ This Sub has been selected.</p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Feedback Form Section */}
      {showFeedbackForm && (
        <div className="mt-8">
          <FeedbackForm
            jobId={job._id}
            fromUser={user._id}
            toUser={job.selectedApplicant}
            role={user.role}
            targetInterests={
              user.role === 'Sub'
                ? (job.posterId.kinks || [])
                : (job.selectedApplicant.kinks || [])
            }
          />
          <button onClick={() => setShowFeedbackForm(false)} className="mt-4">Close Feedback Form</button>
        </div>
      )}
      </div>
      </>
    );
}

export default JobDetail;
