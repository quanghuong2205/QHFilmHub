import { useUpviewMovie } from '@/services/useMovie';
import { useEffect, useRef, useState } from 'react';

interface IUseUpView {
  isPlay: boolean;
  slug: string;
  minutes?: number;
}

function useUpView({ isPlay, slug, minutes = 10 }: IUseUpView) {
  const [isUp, setIsUp] = useState(false);
  const { trigger } = useUpviewMovie(slug);

  /* SetTimeOut to up after 3 minutes */
  useEffect(() => {
    setTimeout(() => {
      setIsUp(true);
    }, minutes * 60 * 1000);
  }, [minutes]);

  /* Request api to up view */
  useEffect(() => {
    if (!isUp) return;
    trigger();
  }, [isUp, trigger]);
}

export default useUpView;
