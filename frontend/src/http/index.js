import axios from "axios";

const api = axios.create({
  //http://localhost:5500/api/send-otp
  //baseURL:http://localhost:5500
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// List of all the endpoints
export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);

// Interceptors
api.interceptors.response.use(
  (config) => {
      return config;
  },
  async (error) => {
      const originalRequest = error.config;
      if (
          error.response.status === 401 &&
          originalRequest &&
          !originalRequest._isRetry
      ) {
          originalRequest.isRetry = true;
          try {
              await axios.get(
                  `${process.env.REACT_APP_API_URL}/api/refresh`,
                  {
                      withCredentials: true,
                  }
              );

              return api.request(originalRequest);
          } catch (err) {
              console.log(err.message);
          }
      }
      throw error;
  }
);

export default api;
