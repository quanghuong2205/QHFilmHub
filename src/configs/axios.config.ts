import axios, { InternalAxiosRequestConfig } from 'axios';
import env from '@/configs/env';
import { refreshTokenApi } from '../apis/auth.api';
import { LOCAL_STORAGE_KEY } from '@/constant/local-storage-key.const';
import { headers } from 'next/headers';

/* Instance */
export const instance = axios.create({
  baseURL: env.SERVER_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  function (config) {
    /* Get token from local storage */
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    /* Attach auth to headers */
    config.headers.set('authorization', `Bearer ${accessToken}`);

    /* Return config */
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/* Response interceptor */
const NO_RETRY_AUTH = 'x-no-re-try';

instance.interceptors.response.use(
  async function (response) {
    /* delay a a little bit */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response?.data?.data;
  },

  async function (error) {
    const config = error.config;
    const isRetry = config.headers[NO_RETRY_AUTH] !== 'true';
    const isSignInApi = config.url.startsWith('/auth/sign-in');
    console.log('retry:: ', isRetry);

    if (!isSignInApi && +error.response?.status === 401 && isRetry) {
      /* Refresh token */
      const res = (await refreshTokenApi(NO_RETRY_AUTH)) as any;

      /* Has new tokens */
      if (res?.access_token) {
        alert('hre');
        /* Save new token */
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res.access_token);

        /* Re-try failed request */
        return await instance.request(error.config);
      }
    }

    return Promise.reject(error.response);
  },
);
