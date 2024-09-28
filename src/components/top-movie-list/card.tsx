import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import classNames from 'classnames';
import MovieCard from '../movie-card';

export interface RankCardProps extends IMovieProps {
  top: number;
}

const rankImageUrls: Record<number, string> = {
  1: '/img/rank-01.png',
  2: '/img/rank-02.png',
  3: '/img/rank-03.png',
  4: '/img/rank-04.png',
  5: '/img/rank-05.png',
};

function RankCard(props: RankCardProps) {
  const { top } = props;
  return (
    <div
      className={classNames({
        [styles['card']]: true,
        [styles['card--top-one']]: top === 1,
      })}>
      <div className={styles['card-media']}>
        <div className={styles['card-media__rank']}>
          <Image
            src={rankImageUrls[top]}
            alt=''
            layout='fill'
          />
        </div>

        <div className={styles['card-media__img']}>
          <Image
            src={props?.thumb_url}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            alt=''
          />
        </div>
      </div>

      <div className={styles['card-infor__wrapper']}>
        <MovieCard {...props} />
      </div>
    </div>
  );
}

export default RankCard;
