import axios from "axios";

const API = axios.create({
  baseURL: "https://turf-backend-ezdy.onrender.com/api", // your backend base URL
});

// Attach token to every request (if exists)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
