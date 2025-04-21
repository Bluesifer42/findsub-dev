import axios from 'axios';

const API_BASE = '/api';

// Jobs
export const createJob = (data) => axios.post(`${API_BASE}/jobs`, data);
export const getJobById = (id) => axios.get(`${API_BASE}/jobs/${id}`);

// Feedback
export const submitFeedback = (data) => axios.post(`${API_BASE}/feedback/new`, data);
export const getFeedbackForJob = (jobId) => axios.get(`${API_BASE}/feedback/${jobId}`);

// Users
export const getUserById = (id) => axios.get(`${API_BASE}/user/${id}`);
export const updateUser = (id, data) => axios.post(`${API_BASE}/user/update/${id}`, data);
export const uploadProfilePic = (id, data) => axios.post(`${API_BASE}/user/profile-pic/${id}`, data);
export const getPublicProfile = (id) => axios.get(`${API_BASE}/user/public/${id}`);

// Auth
export const loginUser = (data) => axios.post(`${API_BASE}/auth/login`, data);
export const registerUser = (data) => axios.post(`${API_BASE}/auth/register`, data);
export const getCurrentUser = () => axios.get(`${API_BASE}/auth/me`);

// Admin
export const getAllKinks = () => axios.get(`${API_BASE}/kinks`);
export const createKink = (data) => axios.post(`${API_BASE}/kinks/create`, data);
export const updateKink = (id, data) => axios.put(`${API_BASE}/kinks/${id}`, data);
export const deleteKink = (id) => axios.delete(`${API_BASE}/kinks/${id}`);

// DevTools
export const createTestUser = (data) => axios.post(`${API_BASE}/devtools/create-user`, data);
export const createTestJob = (data) => axios.post(`${API_BASE}/devtools/create-job`, data);
