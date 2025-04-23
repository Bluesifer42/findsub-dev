import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useUser } from '../hooks/useUser';
import { getAllKinks, getUserFeedback, updateUserProfile } from '../utils/api';

const ratingOptions = [
  'Hard Limit', 'Limit', 'Like it', 'Love it', 'Live for it'
];

function KinksTab() {
  const { user, isLoading } = useUser();
  const [allKinks, setAllKinks] = useState([]);
  const [savedKinks, setSavedKinks] = useState([]);
  const [kinkHistory, setKinkHistory] = useState([]);
  const [newSelections, setNewSelections] = useState([]);
  const [aggRatings, setAggRatings] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (user) {
      setSavedKinks(user.kinks || []);
      setKinkHistory(user.kinkHistory || []);
    }

    getAllKinks().then(({ kinks }) => {
      const options = kinks.map(k => ({
        value: k._id,
        label: k.name,
        description: k.description
      }));
      setAllKinks(options);
    }).catch(() => setStatus('❌ Failed to fetch kinks.'));
  }, [user]);

  useEffect(() => {
    if (user?.role === 'Sub') {
      getUserFeedback(user._id).then(({ feedback }) => {
        const agg = {};
        feedback.forEach(f => {
          Object.entries(f.interestRatings || {}).forEach(([id, val]) => {
            if (val !== null && val !== undefined) {
              if (!agg[id]) agg[id] = { total: 0, count: 0 };
              agg[id].total += Number(val);
              agg[id].count += 1;
            }
          });
        });
        const final = {};
        Object.entries(agg).forEach(([id, { total, count }]) => {
          final[id] = (total / count).toFixed(1);
        });
        setAggRatings(final);
      });
    }
  }, [user]);

  const formatOptionLabel = ({ label, description }) => (
    <div>
      <strong>{label}</strong>
      {description && <div className="text-sm text-gray-500">{description}</div>}
    </div>
  );

  const availableOptions = allKinks.filter(
    opt => !savedKinks.some(item =>
      (item.kink?._id || item.kink) === opt.value
    )
  );

  const handleAddKinks = () => {
    const added = newSelections.map(opt => ({
      kink: { _id: opt.value, label: opt.label, description: opt.description },
      rating: kinkHistory.find(h => (h.kink?._id || h.kink) === opt.value)?.rating || 'Like it'
    }));

    const merged = [...savedKinks];
    added.forEach(k => {
      if (!merged.some(item => (item.kink?._id || item.kink) === k.kink._id)) {
        merged.push(k);
      }
    });

    const updatedHistory = [...kinkHistory];
    added.forEach(k => {
      if (!updatedHistory.some(item => (item.kink?._id || item.kink) === k.kink._id)) {
        updatedHistory.push(k);
      }
    });

    setSavedKinks(merged);
    setKinkHistory(updatedHistory);
    setNewSelections([]);
    setStatus('✅ Kinks added. Don’t forget to save!');
  };

  const handleRatingChange = (kinkId, rating) => {
    const update = list => list.map(item =>
      (item.kink?._id || item.kink) === kinkId
        ? { ...item, rating }
        : item
    );
    setSavedKinks(update(savedKinks));
    setKinkHistory(update(kinkHistory));
  };

  const handleRemove = (kinkId) => {
    const filtered = savedKinks.filter(item =>
      (item.kink?._id || item.kink) !== kinkId
    );
    setSavedKinks(filtered);
    setStatus('Kink removed from selection.');
  };

  const handleSave = async () => {
    try {
      const body = {
        ...user,
        kinks: savedKinks,
        kinkHistory: kinkHistory
      };
      const { user: updated } = await updateUserProfile(user._id, body);
      localStorage.setItem('user', JSON.stringify(updated));
      setStatus('✅ Kink preferences saved.');
    } catch {
      setStatus('❌ Failed to save.');
    }
  };

  if (isLoading) return <p>Loading kinks...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Kinks</h2>
      {status && <p className="mb-4 text-blue-600">{status}</p>}

      <div className="mb-6">
        <h3 className="font-semibold mb-1">Add New Kinks</h3>
        <Select
          options={availableOptions}
          isMulti
          value={newSelections}
          onChange={setNewSelections}
          placeholder="Search and select kinks..."
          formatOptionLabel={formatOptionLabel}
        />
        <button className="mt-2 px-3 py-1 bg-blue-600 text-white" onClick={handleAddKinks}>
          ➕ Add Kinks
        </button>
      </div>

      <h3 className="font-semibold mb-2">Your Selected Kinks</h3>
      {savedKinks.length === 0 ? (
        <p className="text-gray-600">No kinks selected.</p>
      ) : (
        <table className="w-full text-sm border-t border-gray-300">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Kink</th>
              <th className="p-2">Your Preference</th>
              <th className="p-2">Avg Feedback</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedKinks.map((item, i) => {
              const id = item.kink?._id || item.kink;
              const label = item.kink?.label || id;
              return (
                <tr key={`${id}_${i}`} className="border-b">
                  <td className="p-2">{label}</td>
                  <td className="p-2">
                    <select
                      value={item.rating}
                      onChange={e => handleRatingChange(id, e.target.value)}
                      className="border px-2 py-1"
                    >
                      {ratingOptions.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">{aggRatings[id] || 'N/A'} / 5</td>
                  <td className="p-2">
                    <button onClick={() => handleRemove(id)} className="text-red-600">
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="mt-4">
        <button className="px-4 py-2 bg-green-600 text-white" onClick={handleSave}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

export default KinksTab;
