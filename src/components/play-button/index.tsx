'use client';
import Play from '@/Icon/Play';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEpisodeModalStore } from '@/store/useEpisodeModal';
import { sendEvent } from '@/utils/event';
import { useMovieModalStore } from '@/store/useMovieModal';

interface IPlayButtonProps {
  slug: string;
  type: string;
  className?: string | any;
  variant?: 'v1' | 'v2';
}

function PlayButton({ slug, type, variant = 'v1', className }: IPlayButtonProps) {
  const router = useRouter();
  const { setMovieSlug, openModal, closeModal: closeEpisodeModal } = useEpisodeModalStore();
  const { closeModal: closeMovieModal, isOpen: isMovieModalOpen } = useMovieModalStore();

  /* Hanlde when click to play the movie */
  const handleWatch = () => {
    if (type === 'phim-le') {
      isMovieModalOpen && closeMovieModal();
      router.push(`/watch/${slug}`);
    } else {
      setMovieSlug(slug);
      openModal();
    }
  };

  return (
    <button
      onClick={handleWatch}
      className={classNames(styles['play-btn'], {
        [styles['circle']]: variant === 'v2',
        [className]: className,
      })}>
      <Play />
      {variant !== 'v2' && <span>Play</span>}
    </button>
  );
}

export default PlayButton;
