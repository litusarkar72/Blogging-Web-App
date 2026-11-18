import axios from "axios";

// Production API requests are proxied by Netlify through /api/v1.
// Local development uses the Vite proxy configured in vite.config.js.
const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

export default api;
