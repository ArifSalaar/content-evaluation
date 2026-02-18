import axios from "axios";

// Create a reusable axios instance
const API = axios.create({
  baseURL: "/api",
  withCredentials: true, 
});

// Optional: add request/response interceptors (for JWT or error logging)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token is ", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
