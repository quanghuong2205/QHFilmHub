import { showToast } from '@/helpers/show-toast.helper';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import { useEffect, useRef } from 'react';

function Network() {
  const { isOnline } = useNetworkStatus();
  const isOnlineFirsTime = useRef(isOnline);

  useEffect(() => {
    if (!isOnline) {
      showToast('default', 'You are currently offline.', { position: 'bottom-left' });
      isOnlineFirsTime.current = false;
    }

    if (isOnline && !isOnlineFirsTime.current) {
      showToast('default', 'Your internet connection was restored.', { position: 'bottom-left' });
    }
  }, [isOnline]);

  return <></>;
}

export default Network;
