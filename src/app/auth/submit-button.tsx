'use client';
import { useSignIn, useSignUp } from '@/services/useAuth';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuth';
import { LOCAL_STORAGE_KEY } from '@/constant/local-storage-key.const';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/components/loading-button';
import { showToast } from '@/helpers/show-toast.helper';
import { ToastOptions } from 'react-toastify';

interface ISubmitButtonProps {
  authInfor: IAuthForm;
  isSignIn: boolean;
}
const toastOpts: Partial<ToastOptions> = { className: 'toast--overlay', autoClose: 500 };

function SubmitButton({ authInfor, isSignIn }: ISubmitButtonProps) {
  const {
    trigger: mutateSI,
    isMutating: isSI,
    data: dataSI,
    error: errorSI,
    reset: resetSI,
  } = useSignIn();
  const {
    trigger: mutateSU,
    isMutating: isSU,
    data: dataSU,
    error: errorSU,
    reset: resetSU,
  } = useSignUp();
  const { setUserInfor } = useAuthStore();
  const router = useRouter();

  /* Handle submit form */
  const handleSubmit = async () => {
    if (isSignIn) {
      if (!authInfor.email || !authInfor.password) {
        showToast('warning', 'Please correct your credentials', toastOpts);
        return;
      }

      await mutateSI(authInfor);
    }

    if (!isSignIn) {
      for (const key in authInfor) {
        if (authInfor[key as keyof IAuthForm] == null) {
          showToast('warning', `Please fill your ${key}`, { ...toastOpts, autoClose: 1500 });
          return;
        }
      }
      await mutateSU(authInfor);
    }
  };

  useEffect(() => {
    /* OK (sign in) */
    if (!isSI && dataSI) {
      /* Save token to local storage */
      if (dataSI?.access_token) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, dataSI.access_token);
      }

      /* Save user infor */
      if (dataSI.user) {
        setUserInfor(dataSI.user);
      }

      /* Redirect to home page */
      showToast('success', 'Sign in successfully', toastOpts);
      setTimeout(() => router.push('/'), 1200);

      /* Reset mutation state */
      resetSI();
    }

    /* Ok (sign up) */
    if (!isSU && dataSU) {
      showToast('success', 'Sign up successfully.', toastOpts);
      setTimeout(() => router.push('/auth?mode=sign-in'), 1200);

      /* Reset mutation state */
      resetSU();
    }

    /* Error (sign in) */
    if (!isSI && errorSI) {
      const message =
        errorSI.status === 401
          ? 'Your credentials are not valid'
          : 'Got an error! Try to sign up again';
      showToast('error', message, toastOpts);

      /* Reset mutation state */
      resetSI();
    }

    /* Error (sign up) */
    if (!isSU && errorSU) {
      const message =
        errorSU.status === 400
          ? 'Email has been already used'
          : 'Got an error! Try to sign up again';
      showToast('error', message, toastOpts);

      /* Reset mutation state */
      resetSU();
    }
  });

  return (
    <LoadingButton
      className='btn pri-btn'
      onClick={() => handleSubmit()}
      isLoading={isSI || isSU}
      text={isSignIn ? 'Sign in' : 'Sign up'}
    />
  );
}

export default SubmitButton;
