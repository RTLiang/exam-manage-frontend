import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.48.41:8080', // your base URL
});

export default api;



