import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
