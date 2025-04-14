import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const ratingOptions = [
  { value: 'Hard Limit', label: 'Hard Limit' },
  { value: 'Limit', label: 'Limit' },
  { value: 'Like it', label: 'Like it' },
  { value: 'Love it', label: 'Love it' },
  { value: 'Live for it', label: 'Live for it' }
];

function KinksTab() {
  const [allKinks, setAllKinks] = useState([]);
  const [newSelections, setNewSelections] = useState([]);
  const [savedKinks, setSavedKinks] = useState([]);   // Active kink selections
  const [kinkHistory, setKinkHistory] = useState([]);   // History of all kinks ever added
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);

  // On mount: load user info and available kinks.
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setSavedKinks(parsed.kinks || []);
      setKinkHistory(parsed.kinkHistory || []);
    }
    fetch('http://localhost:5000/api/kinks')
      .then(res => res.json())
      .then(data => {
        // Map returned kinks to format required by react-select.
        const options = data.kinks.map(kink => ({
          value: kink._id,
          label: kink.name,
          description: kink.description
        }));
        setAllKinks(options);
      })
      .catch(err => {
        console.error('Error fetching kinks:', err);
        setStatus('Error fetching kink data');
      });
  }, []);

  // Build dropdown options: all kinks minus those currently active.
  const availableOptions = allKinks.filter(option => 
    !savedKinks.some(saved => saved.kink === option.value)
  );

  const handleSelectChange = (selectedOptions) => {
    setNewSelections(selectedOptions || []);
  };

  const handleAddKinks = () => {
    if (newSelections.length === 0) return;
    const added = newSelections.map(option => {
      // Check if this kink already exists in the user's history.
      const existing = kinkHistory.find(entry => entry.kink === option.value);
      if (existing) {
        return existing; // Use previously saved values.
      } else {
        return { kink: option.value, rating: 'Like it' };
      }
    });
    // Merge new added entries with current savedKinks (avoiding duplicates).
    const updatedSaved = [...savedKinks];
    added.forEach(entry => {
      if (!updatedSaved.some(item => item.kink === entry.kink)) {
        updatedSaved.push(entry);
      }
    });
    // Also update kinkHistory with any new entries.
    const updatedHistory = [...kinkHistory];
    added.forEach(entry => {
      if (!updatedHistory.some(item => item.kink === entry.kink)) {
        updatedHistory.push(entry);
      }
    });
    setSavedKinks(updatedSaved);
    setKinkHistory(updatedHistory);
    setNewSelections([]);
    setStatus('New kinks added to your list. Don’t forget to save changes.');
  };

  const handleRatingChange = (kinkId, newRating) => {
    const updated = savedKinks.map(item => {
      if (item.kink === kinkId) {
        return { ...item, rating: newRating };
      }
      return item;
    });
    setSavedKinks(updated);
    // Also update in the kinkHistory.
    const updatedHistory = kinkHistory.map(item => {
      if (item.kink === kinkId) {
        return { ...item, rating: newRating };
      }
      return item;
    });
    setKinkHistory(updatedHistory);
  };

  const handleRemoveKink = (kinkId) => {
    // Remove only from active selections.
    const updated = savedKinks.filter(item => item.kink !== kinkId);
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
        <div style={{ fontSize: '0.8em', color: '#666' }}>
          {option.description}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Your Kinks</h2>
      {status && <p>{status}</p>}

      {/* Section for adding new kink selections */}
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

      {/* Table of Active (Saved) Kinks */}
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
              {savedKinks.map(item => {
                const kinkData = allKinks.find(k => k.value === item.kink) || {};
                return (
                  <tr key={item.kink} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>
                      {kinkData.label || item.kink}
                      {kinkData.description && (
                        <div style={{ fontSize: '0.8em', color: '#666' }}>
                          {kinkData.description}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <select
                        value={item.rating}
                        onChange={(e) => handleRatingChange(item.kink, e.target.value)}
                      >
                        {ratingOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      {/* Placeholder: Future enhancement for displaying feedback rating */}
                      N/A
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <button onClick={() => handleRemoveKink(item.kink)}>Remove</button>
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
