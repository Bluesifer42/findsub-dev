// src/utils/api.js

import React from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';


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

// ========================
// 🔐 Auth
// ========================
export const loginUser = (email, password) =>
  request('post', '/auth/login', { email, password });

export const registerUser = (data) =>
  request('post', '/auth/register', data);

export const getCurrentUser = () =>
  request('get', '/auth/me');

// ========================
// 👤 Users
// ========================
export const getUserById = (id) =>
  request('get', `/user/${id}`);

export const updateUser = (id, data) =>
  request('post', `/user/update/${id}`, data);

export const uploadProfilePic = (id, data) =>
  request('post', `/user/profile-pic/${id}`, data);

export const getPublicProfile = (id) =>
  request('get', `/user/public/${id}`);

export const updateUserProfile = (id, data) =>
  request('put', `/profile/${id}`, data);

// ========================
// 🧪 Dev Tools
// ========================
export const createTestUser = (data) =>
  request('post', '/devtools/create-user', data);

export const createTestJob = (domId) =>
  request('post', '/devtools/create-job', { domId });

export const createTestApplication = (applicantId, jobId) =>
  request('post', '/admin/create-test-application', { applicantId, jobId });

export const purgeType = (type) =>
  request('delete', `/admin/purge/${type}`);

// ========================
// 🧩 Kinks
// ========================
export const getAllKinks = () => request('get', '/kinks');
export const getKinks = () => request('get', '/admin/kinks');
export const createKink = (data) => request('post', '/admin/kinks', data);
export const updateKink = (id, data) => request('put', `/admin/kinks/${id}`, data);
export const deleteKink = (id) => request('delete', `/admin/kinks/${id}`);

// ========================
// 📋 Jobs
// ========================
export const getAllJobs = () => request('get', '/jobs');
export const getAllAdminJobs = () => request('get', '/admin/jobs');
export const getJobsByPoster = (posterId) => request('get', `/jobs?view=poster&posterId=${posterId}`);
export const getDomJobHistory = (domId) => request('get', `/jobs/history/${domId}`);
export const getJobsAwaitingFeedback = (userId) => request('get', `/jobs/awaiting-feedback/${userId}`);
export const getJobById = (id) => request('get', `/job/${id}`);

export const createJob = (jobData) => request('post', '/jobs', jobData);
export const deleteJob = (jobId) => request('delete', `/jobs/delete/${jobId}`);
export const updateJobStatus = ({ jobId, newStatus }) =>
  request('post', '/jobs/status', { jobId, newStatus });

export const selectApplicant = ({ jobId, applicantId }) =>
  request('post', '/jobs/select', { jobId, applicantId });

// ========================
// 🙋 Applications
// ========================
export const getApplicationsForJob = (jobId) =>
  request('get', `/applications/${jobId}`);

export const applyToJob = ({ jobId, applicantId, coverLetter }) =>
  request('post', '/apply', { jobId, applicantId, coverLetter });

export const retractApplication = (jobId, userId) =>
  request('delete', `/apply/${jobId}/${userId}`);

// ========================
// 🗣 Feedback
// ========================
export const getAllFeedback = () => request('get', '/admin/feedback');
export const getFeedbackForJob = (jobId) => request('get', `/feedback/job/${jobId}`);
export const getUserFeedback = (userId) => request('get', `/feedback/user/${userId}`);
export const submitFeedback = (payload) => request('post', '/feedback/new', payload);

// ========================
// 👥 Admin Users
// ========================
export const getAdminUsers = () => request('get', '/admin/users');
export const getUsers = () => request('get', '/admin/users');
export const deleteUserById = (id) => request('delete', `/admin/users/${id}`);
