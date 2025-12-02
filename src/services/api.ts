// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  // Use o seu IP local (192.168.0.5) e a porta do BFF (8080)
  baseURL: 'http://192.168.0.5:8080', 
});

export default api;