'use client';

import styles from '../styles.module.scss';
import PlayButton from '@/components/play-button';
import FavoriteButton from '@/components/favorite-button';

function MovieActions({
  type,
  slug,
  isFavourite,
}: {
  type: string;
  slug: string;
  isFavourite: boolean;
}) {
  return (
    <div className={styles['detail-acts']}>
      <PlayButton
        slug={slug}
        type={type}
        className={styles['play-btn']}
      />

      <FavoriteButton
        slug={slug}
        isFavourite={isFavourite}
        className={styles['favor-btn']}
      />
    </div>
  );
}

export default MovieActions;
