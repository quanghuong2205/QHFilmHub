import { instance } from '../configs/axios.config';

export const refreshTokenApi = async (retryFlag: string) => {
  return await instance.post(
    '/auth/refresh-token',
    {},
    {
      withCredentials: true,
      headers: { [retryFlag]: 'true' },
    },
  );
};

export const signInApi = async (
  email: string,
  password: string,
): Promise<{ user?: IUser; access_token?: string }> => {
  return await instance.post(
    '/auth/sign-in',
    { email, password },
    {
      withCredentials: true,
    },
  );
};

export const signUpApi = async (email: string, password: string, name?: string) => {
  return await instance.post('/auth/sign-up', { email, password, name });
};

export const signOutApi = async () => {
  return await instance.post(
    '/auth/sign-out',
    {},
    {
      withCredentials: true,
    },
  );
};

export const getUserInforApi = async () => {
  return await instance.get('/auth/infor', { withCredentials: true });
};
