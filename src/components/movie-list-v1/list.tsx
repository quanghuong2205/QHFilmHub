import { createRandomArray } from '@/utils/randomArray';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Skeleton from '../movie-expandable-card/skeleton';
import ExpanableMovieCard from '../movie-expandable-card';
import classNames from 'classnames';
import styles from './styles.module.scss';
import 'swiper/css';

function List({
  isLoading,
  movies,
  limit,
}: {
  isLoading: boolean;
  movies: IMovieProps[] | undefined;
  limit: number;
}) {
  const isMobile = false;

  if (isMobile) {
    return (
      <div className={styles['list-body']}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}>
          {isLoading ? (
            <>
              {createRandomArray(limit || 5).map((e) => (
                <SwiperSlide key={e}>
                  <Skeleton />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {movies?.map((movie) => (
                <SwiperSlide key={movie._id}>
                  <ExpanableMovieCard
                    isShownExpanableCard={false}
                    movie={movie}
                  />
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>
    );
  }

  return (
    <div
      className={classNames({
        'row row-cols-5 gx-2': true,
      })}>
      {isLoading ? (
        <>
          {createRandomArray(limit || 5).map((e) => (
            <Skeleton key={e} />
          ))}
        </>
      ) : (
        <>
          {movies?.map((movie) => (
            <ExpanableMovieCard
              key={movie._id}
              movie={movie}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default List;
