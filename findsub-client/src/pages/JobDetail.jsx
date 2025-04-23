import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import { useUser } from '../hooks/useUser';
import {
  getJobById,
  getFeedbackForJob,
  getApplicationsForJob,
  applyToJob,
  retractApplication,
  updateJobStatus,
  deleteJob,
  selectApplicant
} from '../utils/api';

function JobDetail() {
  const { user, isAuthenticated, isLoading } = useUser();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [applications, setApplications] = useState([]);
  const [hasApplied, setHasApplied] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { job } = await getJobById(jobId);
        setJob(job);
      } catch {
        setStatus('❌ Failed to load job details.');
      }
    })();
  }, [jobId]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const { feedback } = await getFeedbackForJob(jobId);
        setFeedback(feedback);

        const { applications } = await getApplicationsForJob(jobId);
        setApplications(applications);

        const applied = applications.some(app => app.applicantId._id === (user._id || user.id));
        setHasApplied(applied);
      } catch (err) {
        console.error('Error fetching feedback or applications:', err);
      }
    })();
  }, [jobId, user]);

  const handleApply = async () => {
    const confirmed = window.confirm('Do you want to apply for this job?');
    if (!confirmed) return;

    const cover = prompt('Optional: Add a message (or leave blank):');
    if (cover === null) return alert('Application cancelled.');

    try {
      await applyToJob({ jobId, applicantId: user._id || user.id, coverLetter: cover.trim() });
      alert('✅ Application submitted!');
      setHasApplied(true);
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  const handleRetract = async () => {
    if (!window.confirm('Retract your application?')) return;
    try {
      await retractApplication(jobId, user._id || user.id);
      setHasApplied(false);
      alert('✅ Application retracted.');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  const handleDeleteJob = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await deleteJob(jobId);
      alert('✅ Job deleted.');
      navigate('/jobs');
    } catch (err) {
      alert('❌ Error deleting job.');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!window.confirm(`Mark this job as ${newStatus}?`)) return;
    try {
      await updateJobStatus({ jobId, newStatus });
      window.location.reload();
    } catch (err) {
      alert('❌ Failed to update job status.');
    }
  };

  const handleSelectApplicant = async (applicantId) => {
    if (!window.confirm('Select this applicant for the job?')) return;
    try {
      await selectApplicant({ jobId, applicantId });
      alert('✅ Sub selected.');
      window.location.reload();
    } catch (err) {
      alert('❌ Failed to select applicant.');
    }
  };

  const handleFeedbackClick = () => {
    if (!job?.selectedApplicant) return alert('No applicant selected yet.');
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

  const isPoster = user?._id === job.posterId._id || user?.id === job.posterId._id;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link to={`/job/${job._id}`}>{job.title}</Link>
      </h2>

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
              <li key={k._id}>
                {k.name}
                {k.description && <span className="text-sm text-gray-600"> – {k.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

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

      {/* Applicant Section */}
      {user?.role === 'Dom' && isPoster && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Applicants</h3>
          {applications.length === 0 ? (
            <p>No applicants yet.</p>
          ) : (
            applications.map(app => (
              <div key={app._id} className="border p-4 mb-4 rounded">
                <p><strong>Username:</strong> {app.applicantId.username}</p>
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
            fromUser={user.id}
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
  );
}

export default JobDetail;
