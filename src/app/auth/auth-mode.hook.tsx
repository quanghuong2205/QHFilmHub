import { EVENT } from '@/constant/event.const';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function useAuthMode() {
  /* Read auth mode from query string */
  const searchParams = useSearchParams();
  const authMode = searchParams.get('mode');

  const [isSignIn, setIsSignIn] = useState(authMode !== 'sign-up');

  /* Router */
  const router = useRouter();

  /* Handle switch btw auth mode */
  const handleSwitchMode = () => {
    router.replace(`/auth?mode=${isSignIn ? 'sign-up' : 'sign-in'}`);
  };

  /* Set auth mode */
  useEffect(() => {
    /* Set auth mode */
    setIsSignIn(authMode !== 'sign-up');

    /* Clear text input error */
    window.dispatchEvent(new Event(EVENT.RESET_INPUT_STATE));
  }, [authMode]);

  return { handleSwitchMode, isSignIn };
}

export default useAuthMode;
