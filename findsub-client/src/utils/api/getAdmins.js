import axios from 'axios';

export const getAdmins = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE}/admin/admin-directory`);
  return res.data;
};
