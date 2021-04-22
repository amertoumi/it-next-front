import axios from 'axios';    
import ls from 'local-storage';
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
      //get token
      const token = ls.get('token');
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${token}`;
    
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    //config.baseURL = 'https://example.io/api/';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};