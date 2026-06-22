import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach the JWT (stored in localStorage after Firebase login) to every request.
axiosSecure.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("medicare-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosSecure;

