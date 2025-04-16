import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const ratingOptions = [
  { value: 'Hard Limit', label: 'Hard Limit' },
  { value: 'Limit', label: 'Limit' },
  { value: 'Like it', label: 'Like it' },
  { value: 'Love it', label: 'Love it' },
  { value: 'Live for it', label: 'Live for it' }
];

// Helper functions:
// getInterestKey now returns the underlying kink's ID (string).
const getInterestKey = (interest) => {
  if (typeof interest === 'string') return interest;
  if (interest && interest._id) return interest._id.toString();
  if (interest && interest.kink && interest.kink._id)
    return interest.kink._id.toString();
  return '';
};

// getInterestName checks if the saved kink is stored as a populated object with a label.
const getInterestName = (interest) => {
  if (typeof interest === 'string') return interest;
  if (interest && interest.label) return interest.label;
  if (interest && interest.kink && interest.kink.name)
    return interest.kink.name;
  return 'Unknown';
};

function KinksTab() {
  const [allKinks, setAllKinks] = useState([]);           // Options from backend
  const [newSelections, setNewSelections] = useState([]);   // Newly selected options from dropdown
  const [savedKinks, setSavedKinks] = useState([]);         // Active saved kink selections for the user
  const [kinkHistory, setKinkHistory] = useState([]);       // Historical saved kink data
  const [aggRatings, setAggRatings] = useState({});         // Aggregated feedback ratings
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);

  // On mount: load current user and available kink options.
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      // Use saved kinks and history if they exist.
      setSavedKinks(parsed.kinks || []);
      setKinkHistory(parsed.kinkHistory || []);
    }
    fetch('http://localhost:5000/api/kinks')
      .then((res) => res.json())
      .then((data) => {
        // Map each kink to an option object for react-select.
        const options = data.kinks.map((kink) => ({
          value: kink._id.toString(),
          label: kink.name,
          description: kink.description
        }));
        setAllKinks(options);
      })
      .catch((err) => {
        console.error('Error fetching kinks:', err);
        setStatus('Error fetching kink data');
      });
  }, []);

  // If the user is a Sub, aggregate feedback ratings.
  useEffect(() => {
    const userId = user?._id || user?.id;
    if (userId && user.role === 'Sub') {
      fetch(`http://localhost:5000/api/feedback/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const agg = {};
          data.feedback.forEach((f) => {
            if (f.interestRatings && typeof f.interestRatings === 'object') {
              const entries = Object.entries(f.interestRatings || {});
              entries.forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                  if (!agg[key]) {
                    agg[key] = { total: 0, count: 0 };
                  }
                  agg[key].total += Number(value);
                  agg[key].count += 1;
                }
              });
            }
          });
          const finalAgg = {};
          Object.keys(agg).forEach((key) => {
            finalAgg[key] = (agg[key].total / agg[key].count).toFixed(1);
          });
          setAggRatings(finalAgg);
        })
        .catch((err) => console.error('Feedback aggregation error:', err));
    }
  }, [user]);

  // Build dropdown options: show only kinks not already saved.
  const availableOptions = allKinks.filter((option) =>
    !savedKinks.some((item) => {
      // For saved items, if they're stored as populated objects, use their _id.
      const savedKinkId =
        typeof item.kink === 'object' && item.kink._id
          ? item.kink._id.toString()
          : String(item.kink);
      return savedKinkId === option.value;
    })
  );

  const handleSelectChange = (selectedOptions) => {
    setNewSelections(selectedOptions || []);
  };

  // Updated handleAddKinks: store the full kink object (populated) instead of only the ID.
  const handleAddKinks = () => {
    if (newSelections.length === 0) return;
    const added = newSelections.map((option) => {
      // Check if this kink exists in kinkHistory
      const existing = kinkHistory.find((entry) => String(entry.kink) === option.value);
      if (existing) {
        // Build a populated object using available option data.
        return { kink: { _id: option.value, label: option.label, description: option.description }, rating: existing.rating };
      } else {
        return { kink: { _id: option.value, label: option.label, description: option.description }, rating: 'Like it' };
      }
    });
    const updatedSaved = [...savedKinks];
    added.forEach((entry) => {
      if (
        !updatedSaved.some((item) => {
          const id = (typeof item.kink === 'object' && item.kink._id)
            ? item.kink._id.toString()
            : String(item.kink);
          return id === String(entry.kink._id);
        })
      ) {
        updatedSaved.push(entry);
      }
    });
    const updatedHistory = [...kinkHistory];
    added.forEach((entry) => {
      if (
        !updatedHistory.some((item) => {
          const id = (typeof item.kink === 'object' && item.kink._id)
            ? item.kink._id.toString()
            : String(item.kink);
          return id === String(entry.kink._id);
        })
      ) {
        updatedHistory.push(entry);
      }
    });
    setSavedKinks(updatedSaved);
    setKinkHistory(updatedHistory);
    setNewSelections([]);
    setStatus('New kinks added to your list. Don’t forget to save changes.');
  };

  const handleRatingChange = (kinkId, newRating) => {
    const updated = savedKinks.map((item) => {
      const currentId =
        typeof item.kink === 'object' && item.kink._id
          ? item.kink._id.toString()
          : String(item.kink);
      if (currentId === kinkId) {
        return { ...item, rating: newRating };
      }
      return item;
    });
    setSavedKinks(updated);
    const updatedHistory = kinkHistory.map((item) => {
      const currentId =
        typeof item.kink === 'object' && item.kink._id
          ? item.kink._id.toString()
          : String(item.kink);
      if (currentId === kinkId) {
        return { ...item, rating: newRating };
      }
      return item;
    });
    setKinkHistory(updatedHistory);
  };

  const handleRemoveKink = (kinkId) => {
    const updated = savedKinks.filter((item) => {
      const currentId =
        typeof item.kink === 'object' && item.kink._id
          ? item.kink._id.toString()
          : String(item.kink);
      return currentId !== kinkId;
    });
    setSavedKinks(updated);
    setStatus('Kink removed from active selections. Its history is preserved.');
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    const userId = user._id || user.id;
    if (!userId) {
      setStatus('Error: User ID not found.');
      return;
    }
    const updatedUser = {
      ...user,
      kinks: savedKinks,
      kinkHistory: kinkHistory
    };
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Kink selections updated successfully.');
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating kinks:', error);
      setStatus('Error updating kinks.');
    }
  };

  // Custom formatting for dropdown options.
  const formatOptionLabel = (option) => (
    <div>
      <strong>{option.label}</strong>
      {option.description && (
        <div style={{ fontSize: '0.8em', color: '#666' }}>{option.description}</div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Your Kinks</h2>
      {status && <p>{status}</p>}

      {/* Dropdown for adding new kink selections */}
      <div style={{ marginBottom: '1rem' }}>
        <h3>Select New Kinks</h3>
        <Select
          options={availableOptions}
          isMulti
          onChange={handleSelectChange}
          value={newSelections}
          placeholder="Search and select kinks..."
          formatOptionLabel={formatOptionLabel}
        />
        <button onClick={handleAddKinks} style={{ marginTop: '0.5rem' }}>
          Add Selected Kinks
        </button>
      </div>

      {/* Table displaying saved kink selections */}
      <div>
        <h3>Your Selected Kinks</h3>
        {savedKinks.length === 0 ? (
          <p>No kinks selected yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Kink</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Your Selection</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Feedback Rating</th>
                <th style={{ padding: '0.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedKinks.map((item, index) => {
                const kinkId =
                  typeof item.kink === 'object' && item.kink._id
                    ? item.kink._id.toString()
                    : String(item.kink);
                const displayName = item.kink && item.kink.label 
                  ? item.kink.label 
                  : getInterestName(item);
                const avgRating = aggRatings[kinkId] ? aggRatings[kinkId] : 'N/A';
                return (
                  <tr key={`${kinkId}_${index}`} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>
                      {displayName}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <select
                        value={item.rating}
                        onChange={(e) => handleRatingChange(kinkId, e.target.value)}
                      >
                        {ratingOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      {avgRating} / 5
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <button onClick={() => handleRemoveKink(kinkId)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default KinksTab;
