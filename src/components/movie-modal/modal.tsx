import PlayButton from '../play-button';
import styles from './styles.module.scss';
import FavoriteButton from '../favorite-button';
import CustomImage from '../custom-image';
import MovieModalSkeleton from './skeleton';
import { useMovieModalStore } from '@/store/useMovieModal';
import { useMovieDetail } from '@/services/useMovie';
import Link from 'next/link';
import classNames from 'classnames';

function MainMovieModal() {
  const { slug } = useMovieModalStore();
  const { data, isLoading } = useMovieDetail(slug!);

  if (isLoading && !data) {
    return <MovieModalSkeleton />;
  }

  return (
    <>
      <div className={styles['movie-modal__top']}>
        <div className={styles['movie-media']}>
          <CustomImage
            src={data?.thumb_url!}
            alt={data?.name!}
          />
        </div>

        <div className={styles['movie-act']}>
          <h3>{data?.name}</h3>
          <div>
            <PlayButton
              slug={data?.slug!}
              type={data?.type!}
              className={styles['movie-act__play-btn']}
            />
            <Link
              href={`/detail/${data?.slug}`}
              className={classNames('outline-btn', styles['movie-act__link'])}>
              Chi tiết
            </Link>
            <FavoriteButton
              slug={data?.slug!}
              isFavourite={!!data?.isFavourite}
              className={styles['movie-act__add-btn']}
            />
          </div>
        </div>
      </div>

      <div className={styles['movie-infor']}>
        <div className={styles['movie-prop__group']}>
          <span className={styles['movie-prop__label']}>Thời lượng: </span>
          <span className={styles['movie-prop__value']}>
            {data?.hours} giờ {data?.minutes} phút
          </span>
        </div>

        <div className={styles['movie-prop__group']}>
          <span className={styles['movie-prop__label']}>Diễn viên: </span>
          <span className={styles['movie-prop__value']}>{data?.actor.join(', ')}</span>
        </div>

        <div className={styles['movie-prop__group']}>
          <span className={styles['movie-prop__label']}>Thể loại: </span>
          <span className={styles['movie-prop__value']}>
            {data?.category.map((c) => c.name).join(', ')}
          </span>
        </div>

        {data?.total_episode && (
          <div className={styles['movie-prop__group']}>
            <span className={styles['movie-prop__label']}>Trạng thái: </span>
            <span className={styles['movie-prop__value']}>
              <span>{data.current_episode}</span>/<span>{data.total_episode}</span>
            </span>
          </div>
        )}

        <div className={styles['movie-prop__group']}>
          <span className={styles['movie-prop__label']}>Cốt truyện: </span>
          <span className={styles['movie-prop__value']}>{data?.content}</span>
        </div>
      </div>
    </>
  );
}

export default MainMovieModal;
