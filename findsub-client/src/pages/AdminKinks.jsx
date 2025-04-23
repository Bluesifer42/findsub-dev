// src/pages/AdminKinks.jsx

import { useEffect, useState } from 'react';
import {
  getKinks,
  createKink,
  updateKink,
  deleteKink
} from '../utils/api';

function AdminKinks() {
  const [kinks, setKinks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setName('');
    setDescription('');
    setEditingId(null);
    setStatus('');
  };

  const fetchKinksList = async () => {
    try {
      const { kinks } = await getKinks();
      setKinks(kinks);
    } catch (err) {
      setStatus('❌ Failed to fetch kinks.');
    }
  };

  useEffect(() => {
    fetchKinksList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateKink(editingId, { name, description });
        setStatus('✅ Kink updated.');
      } else {
        await createKink({ name, description });
        setStatus('✅ Kink created!');
      }
      resetForm();
      fetchKinksList();
    } catch (err) {
      setStatus(`❌ ${err.message || 'Operation failed.'}`);
    }
  };

  const handleEditStart = (kink) => {
    setEditingId(kink._id);
    setName(kink.name);
    setDescription(kink.description);
    setStatus('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this kink?')) return;
    try {
      await deleteKink(id);
      setStatus('✅ Kink deleted.');
      fetchKinksList();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin: Kink Manager</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <h4 className="font-semibold mb-2">
          {editingId ? '✏️ Edit Kink' : '➕ Add New Kink'}
        </h4>

        <input
          type="text"
          placeholder="Kink name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-2 p-2 border"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full mb-2 p-2 border"
        />
        <button type="submit">{editingId ? 'Update Kink' : 'Create Kink'}</button>
        {editingId && (
          <button type="button" onClick={resetForm} className="ml-4">
            Cancel
          </button>
        )}
        <p className="mt-2">{status}</p>
      </form>

      <h4 className="font-semibold">📚 All Kinks</h4>
      <ul className="mt-4 space-y-4 list-none">
        {kinks.map(k => (
          <li key={k._id}>
            <strong>{k.name}</strong><br />
            <span>{k.description}</span><br />
            <button onClick={() => handleEditStart(k)}>Edit</button>
            <button onClick={() => handleDelete(k._id)} className="ml-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminKinks;
