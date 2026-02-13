import axios from 'axios';

/**
 * Axios instance for translator API requests.
 */
const translatorAxios = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
// translatorAxios.interceptors.request.use(
//   (config) => {
//     // You can add any request modifications here
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptor
// translatorAxios.interceptors.response.use(
//   (response) => {
//     // You can add any response modifications here
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default translatorAxios;
