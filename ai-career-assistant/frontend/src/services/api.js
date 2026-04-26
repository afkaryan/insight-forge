import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to add the token to requests
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedData = JSON.parse(userInfo);
      if (parsedData.token) {
        config.headers.Authorization = `Bearer ${parsedData.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to unwrap the standardized { success: true, data: ... } payload
api.interceptors.response.use(
  (response) => {
    // If the response contains our standardized success payload, unpack the inner data
    if (response.data && response.data.success === true && response.data.data !== undefined) {
      // Re-assign the unwrapped 'data' back to response.data so Axios still returns it as expected
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    // Also try to unpack structured error messages
    if (error.response && error.response.data && error.response.data.message) {
      // It's often easier to log this natively, but we will pass the error unmodified
    }
    return Promise.reject(error);
  }
);

export default api;
