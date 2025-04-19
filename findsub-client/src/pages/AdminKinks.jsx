import { useEffect, useState } from 'react';

function AdminKinks() {
  const [kinks, setKinks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const fetchKinks = () => {
    fetch('http://localhost:5000/api/admin/kinks')
      .then(res => res.json())
      .then(data => setKinks(data.kinks))
      .catch(() => setStatus('Failed to fetch kinks.'));
  };

  useEffect(() => {
    fetchKinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/kinks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Kink created!');
      setName('');
      setDescription('');
      fetchKinks();
    } else {
      setStatus(data.message || 'Failed to create kink.');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>Admin: Kink Manager</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h4>Add New Kink</h4>
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
        <button type="submit">Create Kink</button>
        <p>{status}</p>
      </form>

      <h4>All Kinks</h4>
      <ul>
        {kinks.map(k => (
          <li key={k._id}><strong>{k.name}</strong>: {k.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminKinks;
