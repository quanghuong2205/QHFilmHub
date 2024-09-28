import { listenEvent } from '@/utils/event';
import { useEffect, useState } from 'react';

const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;

function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(getOnLineStatus());

  useEffect(() => {
    const onlineEventRemover = listenEvent('online', () => {
      console.log('online');
      setIsOnline(true);
    });

    const offlineEventRemover = listenEvent('offline', () => {
      console.log('offline');
      setIsOnline(false);
    });

    return () => {
      onlineEventRemover();
      offlineEventRemover();
    };
  }, [isOnline]);

  return { isOnline };
}

export default useNetworkStatus;
