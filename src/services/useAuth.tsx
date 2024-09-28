import { getUserInforApi, signInApi, signOutApi, signUpApi } from '@/apis/auth.api';
import useSWRMutation from 'swr/mutation';

export const SIGN_IN_KEY = '/auth/sign-in';
export const SIGN_UP_KEY = '/auth/sign-up';
export const SIGN_OUT_KEY = '/auth/sign-out';
export const USER_INFOR_KEY = '/auth/infor';

export function useSignIn() {
  return useSWRMutation(
    SIGN_IN_KEY,
    async (url, { arg: { email, password } }: { arg: Pick<IAuthForm, 'email' | 'password'> }) => {
      return await signInApi(email, password);
    },
  );
}

export function useSignUp() {
  return useSWRMutation(
    SIGN_OUT_KEY,
    async (url, { arg: { email, password, name } }: { arg: IAuthForm }) => {
      return await signUpApi(email, password, name);
    },
  );
}

export function useSignOut() {
  return useSWRMutation(SIGN_UP_KEY, async () => {
    return await signOutApi();
  });
}

export function useUserInfor() {
  return useSWRMutation(USER_INFOR_KEY, async () => {
    return await getUserInforApi();
  });
}
