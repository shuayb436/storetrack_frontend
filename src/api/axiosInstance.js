import axios from 'axios';

// In development: calls go directly to localhost:8080
// In production (Docker): Nginx proxies /api/ to the backend container, so baseURL is empty
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
});

export default axiosInstance;
