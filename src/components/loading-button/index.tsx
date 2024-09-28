import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface LoadingButtonProps {
  isLoading: boolean;
  text: string;
  onClick?: () => void;
  className?: string | any;
}

function LoadingButton({ isLoading, text, className, onClick }: LoadingButtonProps) {
  /* Handle click button */
  const handleOnClick = () => {
    if (!onClick) return;
    return !isLoading && onClick();
  };

  return (
    <button
      className={classNames({
        ['disable-btn']: isLoading,
        [className]: className,
      })}
      onClick={handleOnClick}>
      {!isLoading ? (
        <span>{text}</span>
      ) : (
        <div className={styles['loading']}>
          <div className={styles['loading-img']}>
            <Image
              src={'/img/loading.png'}
              alt='loading'
              layout='fill'
            />
          </div>
        </div>
      )}
    </button>
  );
}

export default LoadingButton;
