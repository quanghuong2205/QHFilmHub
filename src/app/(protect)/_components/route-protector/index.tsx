'use client';
import { getUserInforApi } from '@/apis/auth.api';
import PageLoading from '@/components/page-loading';
import { useAuthStore } from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function RouteProtector({ children }: { children: React.ReactNode }) {
  const { setUserInfor } = useAuthStore();
  const [isShown, setIsShown] = useState(false);
  const router = useRouter();

  /* Handle authenticate user */
  useEffect(() => {
    const handleAuth = async () => {
      try {
        const data = await getUserInforApi();

        /* Save user infor */
        setUserInfor(data as unknown as IUser);

        /* Show children */
        setIsShown(true);
      } catch (error) {
        /* Redirect to login page */
        router.push('/auth?mode-sign-in');
      }
    };

    handleAuth();
  }, [router, setUserInfor]);

  if (!isShown) return <PageLoading />;
  return <>{children}</>;
}

export default RouteProtector;
