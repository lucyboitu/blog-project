import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
     'Cache-Control': 'no-cache'
    
  },
});

export default api;
