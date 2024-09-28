import { useFavouriteMovies, useMoviesByType } from '@/services/useMovie';
import { createRandomArray } from '@/utils/randomArray';
import ExpanableMovieCard from '@/components/movie-expandable-card';
import Skeleton from '@/components/movie-expandable-card/skeleton';
import NoResult from './noresult';

function FavouriteMovies() {
  const { isLoading, data } = useFavouriteMovies();
  if (data && !data.length) {
    return <NoResult />;
  }

  return (
    <>
      <div className='row row-cols-5 gy-3'>
        {isLoading && !data ? (
          <>
            {createRandomArray(5).map((e) => (
              <div
                className='col'
                key={e}>
                <Skeleton />
              </div>
            ))}
          </>
        ) : (
          <>
            {data?.map((movie) => (
              <div
                className='col'
                key={movie._id}>
                <ExpanableMovieCard movie={movie} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default FavouriteMovies;
