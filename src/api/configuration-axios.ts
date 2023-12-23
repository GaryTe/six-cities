import axios, {AxiosRequestConfig} from 'axios';
import { getToken } from './token';

export const creatAxios = () => {
  const api = axios.create({
    baseURL: 'https://12.react.pages.academy/six-cities',
    timeout: 5000
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
