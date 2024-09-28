'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from '../styles.module.scss';
import { Autoplay } from 'swiper/modules';
import CustomImage from '@/components/custom-image';
import { useMoviesByType } from '@/services/useMovie';
import { createRandomArray } from '@/utils/randomArray';
import Link from 'next/link';

function RelatedMovies({ type }: { type: MovieType }) {
  const { data, isLoading } = useMoviesByType(type, 1, 5);

  return (
    <div className={styles['related-movies']}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={3}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}>
        {isLoading ? (
          <>
            {createRandomArray(3).map((id) => (
              <SwiperSlide
                className='skeleton'
                style={{ borderRadius: 6 }}
                key={id}>
                <div className={styles['related-movie__poster']}></div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {data?.movies?.map((movie) => (
              <SwiperSlide key={movie._id}>
                <Link
                  href={`/detail/${movie.slug}`}
                  className={styles['related-movie']}>
                  <div className={styles['related-movie__poster']}>
                    <CustomImage
                      src={movie.thumb_url}
                      alt={movie.name}
                      objectPosition='center'
                    />
                  </div>
                  <span className={styles['related-movie__name']}>{movie.name}</span>
                </Link>
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </div>
  );
}

export default RelatedMovies;
