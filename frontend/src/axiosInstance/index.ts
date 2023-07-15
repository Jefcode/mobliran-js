import axios, { AxiosRequestConfig } from 'axios';

import { baseUrl } from './constants';

interface jwtHeader {
  headers: {
    Authorization?: string;
  };
}

export function getJWTHeader(token: string): jwtHeader {
  return { headers: { Authorization: `Bearer ${token}` } };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
