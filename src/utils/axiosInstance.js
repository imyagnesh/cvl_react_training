import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  timeoutErrorMessage: 'Timeout. Please try after sometime',
});

axiosInstance.interceptors.response.use(
  (value) => value,
  (error) => {
    if (error?.response?.data) {
      return Promise.reject(new Error(error?.response?.data));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
