'use client';
import { useSearchParams } from 'next/navigation';
import styles from './styles.module.scss';
import Movies from './movies';
import NoResult from './noresult';
import FavouriteMovies from './favourite-movies';

const movieTitles: { [key: string]: string } = {
  'phim-bo': 'phim bộ',
  'phim-le': 'phim lẻ',
  'tv-shows': 'phim truyền hình',
  'hoat-hinh': 'phim hoạt hình',
  'yeu-thich': 'phim yêu thích',
};

const movieTypes = ['phim-bo', 'phim-le', 'tv-shows', 'hoat-hinh', 'yeu-thich'];

function MovieList() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  if (!type || !movieTypes.includes(type)) {
    return (
      <div className={styles['page']}>
        <NoResult />
      </div>
    );
  }

  return (
    <div className={styles['page']}>
      <div className={styles['title']}>
        <h3>Danh sách {movieTitles[type]}</h3>
      </div>
      {type === 'yeu-thich' ? <FavouriteMovies /> : <Movies type={type as MovieType} />}
    </div>
  );
}

export default MovieList;
