'use client';
import { useMoviesByType } from '@/services/useMovie';
import styles from './styles.module.scss';
import PaginateItems from '@/components/pagination';
import { createRandomArray } from '@/utils/randomArray';
import ExpanableMovieCard from '@/components/movie-expandable-card';
import Skeleton from '@/components/movie-expandable-card/skeleton';
import { useEffect, useState } from 'react';
import NoResult from './noresult';

const LIMIT = 15;

function Movies({ type }: { type: MovieType }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const { isLoading, isValidating, data } = useMoviesByType(type, page, LIMIT, 'movie-list-page');

  useEffect(() => {
    if (!data?.pagination?.totalPages) return;
    setTotalPages(data.pagination.totalPages);
  }, [data?.pagination.totalPages]);

  const movies = data?.movies;
  if (movies && !movies.length) {
    return <NoResult />;
  }
  return (
    <>
      <div className='row row-cols-5 gy-3'>
        {isLoading || isValidating ? (
          <>
            {createRandomArray(LIMIT).map((e) => (
              <div
                className='col'
                key={e}>
                <Skeleton />
              </div>
            ))}
          </>
        ) : (
          <>
            {movies?.map((movie) => (
              <ExpanableMovieCard
                movie={movie}
                key={movie._id}
              />
            ))}
          </>
        )}
      </div>

      {totalPages && (
        <div className={styles['pagination']}>
          <PaginateItems
            totalPages={totalPages}
            onPageChane={(page) => setPage(page + 1)}
          />
        </div>
      )}
    </>
  );
}

export default Movies;
