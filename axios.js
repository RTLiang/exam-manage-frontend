import axios from 'axios';

const api = axios.create({
  baseURL: 'https://192.168.48.14:8080', // your base URL
});

export default api;


