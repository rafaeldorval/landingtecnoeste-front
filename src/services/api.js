/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'https://trecho.app.br:21124',
  // baseURL: 'http://localhost:21124',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
