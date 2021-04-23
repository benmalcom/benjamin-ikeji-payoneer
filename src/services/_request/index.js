import axios from 'axios';

// Default config options
const defaultOptions = {
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  method: 'GET',
  params: {
    APPID: '75f972b80e26f14fe6c920aa6a85ad57'
  },
};

// Create instance
const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);
// Add a response interceptor
instance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      if (error.code === 'ECONNABORTED')
        throw new Error('Network timeout, please try again');
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      error.message =
        'This request is taking too long, please check your network';
      throw error;
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
);
export default instance;

export const createRequest = config => instance(config);
