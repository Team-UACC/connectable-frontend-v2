import axios from 'axios';
import { getCookie } from 'cookies-next';

export const authorizationOptions = (jwt?: string) => {
  jwt ??= getCookie('auth') as string;

  if (!jwt) return;

  return {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
};

const _axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 5000,
});

_axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export const axiosInstance = _axiosInstance;
