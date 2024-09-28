import styles from './styles.module.scss';
import classNames from 'classnames';
import Plus from '@/Icon/Plus';
import { useEffect, useState } from 'react';
import { useLikeMovie, useUnlikeMovie } from '@/services/useMovie';
import CheckIcon from '@/Icon/CheckIcon';
import CustomImage from '../custom-image';

interface IFavoriteButtonProps {
  slug: string;
  isFavourite: boolean;
  className?: string | any;
}

function FavoriteButton({ slug, className, isFavourite }: IFavoriteButtonProps) {
  const [isLove, setIsLove] = useState(isFavourite);

  /* Mutations */
  const {
    isMutating: isLiking,
    trigger: like,
    data: likeData,
    reset: resetLike,
  } = useLikeMovie(slug);
  const {
    isMutating: isUnliking,
    trigger: unlike,
    data: unlikeData,
    reset: resetUnlike,
  } = useUnlikeMovie(slug);

  /* Handle like or unlike the movie */
  const handleReact = () => {
    isLove ? unlike() : like();
  };

  /* Reset button UI */
  useEffect(() => {
    if (!isLiking && likeData) {
      setIsLove(true);
      resetLike();
    }

    if (!isUnliking && unlikeData) {
      setIsLove(false);
      resetUnlike();
    }
  }, [isLiking, isUnliking, likeData, resetLike, resetUnlike, unlikeData]);

  return (
    <button
      onClick={handleReact}
      className={classNames({
        [styles['add-btn']]: true,
        [className]: className,
        [styles['loading']]: isLiking || isUnliking,
      })}>
      {isLiking || isUnliking ? (
        <CustomImage
          src={'/img/loading.png'}
          alt='loading'
        />
      ) : isLove ? (
        <CheckIcon />
      ) : (
        <Plus />
      )}
    </button>
  );
}

export default FavoriteButton;
