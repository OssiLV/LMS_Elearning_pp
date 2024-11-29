import axios from "axios";
import { getCookie } from "cookies-next";
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Use environment variables for the API URL
    timeout: 5000, // Set a timeout for requests
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add an authorization token if available
        const token = typeof window !== "undefined" ? getCookie("token") : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors
        if (error) {
            console.warn("API Error: ", {
                status: error.response.status,
                statusText: error.response.statusText,
                error: error.response.data.error,
            });
        } else {
            console.error("Network Error:", {
                status: error.response.status,
                statusText: error.response.statusText,
                error: error.response.data.error,
            });
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
