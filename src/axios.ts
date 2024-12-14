import axios, { InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './utils/getCookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cookie = getCookie();
  let token = '';

  if ('token' in cookie) {
    token = (cookie as { token: string }).token;
  }

  config.headers.Authorization = token;
  return config;
});

export default instance;
