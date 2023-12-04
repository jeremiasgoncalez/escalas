import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  // outras configurações, se necessário
});

export default axiosInstance;
