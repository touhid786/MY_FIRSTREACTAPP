import axios from 'axios';

const api = axios.create({
    //http://localhost:5500/api/send-otp
  //baseURL:http://localhost:5500
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// List of all the endpoints
export const sendOtp = (data) => api.post('/api/send-otp', data);
export default api;