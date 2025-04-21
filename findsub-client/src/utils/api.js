import axios from 'axios';

const API_BASE = '/api';

const getToken = () => localStorage.getItem('token');

const request = async (method, url, data = null) => {
  try {
    const headers = {};
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = { method, url: `${API_BASE}${url}`, headers };
    if (data) config.data = data;

    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.error('API Error:', err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// Jobs
export const createJob = (data) => request('post', '/jobs', data);
export const getJobById = (id) => request('get', `/jobs/${id}`);

// Feedback
export const submitFeedback = (data) => request('post', '/feedback/new', data);
export const getFeedbackForJob = (jobId) => request('get', `/feedback/${jobId}`);

// Users
export const getUserById = (id) => request('get', `/user/${id}`);
export const updateUser = (id, data) => request('post', `/user/update/${id}`, data);
export const uploadProfilePic = (id, data) => request('post', `/user/profile-pic/${id}`, data);
export const getPublicProfile = (id) => request('get', `/user/public/${id}`);

// Auth
export const loginUser = (data) => request('post', '/auth/login', data);
export const registerUser = (data) => request('post', '/auth/register', data);
export const getCurrentUser = () => request('get', '/auth/me');

// Admin
export const getAllKinks = () => request('get', '/kinks');
export const createKink = (data) => request('post', '/kinks/create', data);
export const updateKink = (id, data) => request('put', `/kinks/${id}`, data);
export const deleteKink = (id) => request('delete', `/kinks/${id}`);

// DevTools
export const createTestUser = (data) => request('post', '/devtools/create-user', data);
export const createTestJob = (data) => request('post', '/devtools/create-job', data);
