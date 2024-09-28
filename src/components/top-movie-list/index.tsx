'use client';
import { useTopMovies } from '@/services/useMovie';
import RankCard from './card';
import styles from './styles.module.scss';
import { createRandomArray } from '@/utils/randomArray';
import Skeleton from './skeleton';

interface ITopMoviesProps {
  top?: number;
}

function TopMovieList({ top = 2 }: ITopMoviesProps) {
  const { data, isLoading } = useTopMovies(top);
  return (
    <div className={styles['list']}>
      <h3 className={styles['list-title']}>{`Top ${top} movies on QH`}</h3>
      <div className='row row-cols-5 gx-2'>
        {isLoading && !data
          ? createRandomArray(top).map((v) => <Skeleton key={v} />)
          : data?.map((movie, index) => (
              <div
                className='col'
                key={movie.slug}>
                <RankCard
                  {...movie}
                  top={index + 1}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default TopMovieList;
