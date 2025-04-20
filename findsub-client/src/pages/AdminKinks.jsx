import { useEffect, useState } from 'react';

function AdminKinks() {
  const [kinks, setKinks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch all kinks
  const fetchKinks = () => {
    fetch('http://localhost:5000/api/admin/kinks')
      .then(res => res.json())
      .then(data => setKinks(data.kinks))
      .catch(() => setStatus('Failed to fetch kinks.'));
  };

  useEffect(() => {
    fetchKinks();
  }, []);

  // Create new kink
  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/kinks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('✅ Kink created!');
      setName('');
      setDescription('');
      fetchKinks();
    } else {
      setStatus(data.message || 'Failed to create kink.');
    }
  };

  // Start editing
  const handleEditStart = (kink) => {
    setEditingId(kink._id);
    setName(kink.name);
    setDescription(kink.description);
    setStatus('');
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setStatus('');
  };

  // Submit edit
  const handleEditSubmit = async () => {
    const res = await fetch(`http://localhost:5000/api/admin/kinks/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('✅ Kink updated.');
      setEditingId(null);
      setName('');
      setDescription('');
      fetchKinks();
    } else {
      setStatus(data.message || 'Failed to update kink.');
    }
  };

  // Delete kink
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this kink?')) return;

    const res = await fetch(`http://localhost:5000/api/admin/kinks/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('✅ Kink deleted.');
      fetchKinks();
    } else {
      setStatus(data.message || 'Failed to delete kink.');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>Admin: Kink Manager</h2>

      {/* Add or Edit Form */}
      <form onSubmit={editingId ? handleEditSubmit : handleCreate} style={{ marginBottom: '2rem' }}>
        <h4>{editingId ? '✏️ Edit Kink' : '➕ Add New Kink'}</h4>
        <input
          type="text"
          placeholder="Kink name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <button type="submit">{editingId ? 'Update Kink' : 'Create Kink'}</button>
        {editingId && <button type="button" onClick={handleEditCancel} style={{ marginLeft: '1rem' }}>Cancel</button>}
        <p>{status}</p>
      </form>

      {/* List of All Kinks */}
      <h4>📚 All Kinks</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {kinks.map(k => (
          <li key={k._id} style={{ marginBottom: '1rem' }}>
            <strong>{k.name}</strong><br />
            <span>{k.description}</span><br />
            <button onClick={() => handleEditStart(k)}>Edit</button>
            <button onClick={() => handleDelete(k._id)} style={{ marginLeft: '1rem' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminKinks;
