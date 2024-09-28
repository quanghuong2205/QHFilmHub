'use client';
import LoadingButton from '@/components/loading-button';
import { showToast } from '@/helpers/show-toast.helper';
import { useSignOut } from '@/services/useAuth';
import { useAuthStore } from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastOptions } from 'react-toastify';

const toastOpts: Partial<ToastOptions> = { className: 'toast--overlay', autoClose: 200 };

function LogoutButton() {
  const router = useRouter();
  const { data, isMutating, error, trigger: requestSignOut, reset } = useSignOut();
  const { setUserInfor } = useAuthStore();

  useEffect(() => {
    if (error) {
      showToast('error', 'Got an error! Try to sign out again', toastOpts);
      reset();
    }

    if (data) {
      showToast('success', 'Sign out successfully.', toastOpts);
      setUserInfor(null);
      setTimeout(() => router.push('/auth?mode=sign-in'), 1200);
    }
  }, [isMutating, data, error, reset, setUserInfor, router]);

  return (
    <LoadingButton
      onClick={requestSignOut}
      isLoading={isMutating}
      text={'log out'}
    />
  );
}

export default LogoutButton;
