'use client';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ICircle from '@/Icon/ICircle';
import ChevronDown from '@/Icon/ChevronDown';
import { useMovieModalStore } from '@/store/useMovieModal';

interface IMoreInforButtonProps {
  slug?: string;
  className?: string | any;
  variant?: 'v1' | 'v2';
}

function MoreInforButton({ slug, className, variant = 'v1' }: IMoreInforButtonProps) {
  const { setMovieSlug, openModal } = useMovieModalStore();

  /* Handle open movie infor modal */
  const handleOpenModal = async () => {
    if (!slug) return;

    setMovieSlug(slug);
    return openModal();
  };

  return (
    <button
      onClick={handleOpenModal}
      className={classNames(styles['infor-btn'], {
        [className]: className,
        [styles['circle']]: variant !== 'v1',
      })}>
      {variant === 'v1' ? (
        <>
          <ICircle />
          <span>More information</span>
        </>
      ) : (
        <ChevronDown />
      )}
    </button>
  );
}

export default MoreInforButton;
