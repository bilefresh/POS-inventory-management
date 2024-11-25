import axios from 'axios';

const API_BASE_URL = 'https://ak-enterprises-db.onrender.com/api/v1';
console.log(import.meta.env.VITE_APP_API_BASE_URL)
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.msg || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);