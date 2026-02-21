import axios from 'axios';
import { getToken, removeToken, removeUser } from '../utils/auth.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      removeUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

export const login = (usernameOrEmail, password) => {
  return api.post('/auth/login', { usernameOrEmail, password });
};

// Transcript APIs
export const getTranscripts = () => {
  return api.get('/transcripts');
};

export const createTranscript = (originalText, islConvertedText) => {
  return api.post('/transcripts', { originalText, islConvertedText });
};

export const deleteTranscript = (id) => {
  return api.delete(`/transcripts/${id}`);
};

export const deleteAllTranscripts = () => {
  return api.delete('/transcripts');
};

// ISL Conversion API
export const convertToISL = (text) => {
  return api.post('/convert-to-isl/convert-to-isl', { text });
};

// User APIs
export const updateAvatarSettings = (avatarGender, avatarFaceColor) => {
  return api.put('/user/avatar-settings', { avatarGender, avatarFaceColor });
};
