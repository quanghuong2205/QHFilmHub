import CustomImage from '@/components/custom-image';
import styles from './styles.module.scss';
import classNames from 'classnames';
import MovieActions from './_components/acts';
import MovieTabs from './_components/tabs';
import MovieRating from './_components/rating';

function MovieDetail({ movie }: { movie: IMovieDetailProps }) {
  console.log(movie);
  return (
    <div className={styles['detail']}>
      <div className={styles['detail-left']}>
        <div className={styles['detail-poster']}>
          <CustomImage
            src={movie.poster_url}
            alt={movie.name}
            objectPosition='center'
          />
        </div>

        <div className={styles['detail-left__bottom']}>
          <div className={styles['detail-left__infor-block']}>
            <div
              className={classNames(
                styles['detail-left__infor-block__icon'],
                styles['detail-left__infor-block__icon--red'],
              )}>
              <CustomImage
                src='/icon/heart.png'
                alt='heart icon'
              />
            </div>
            <span className={styles['detail-left__infor-block__text']}>
              Yêu thích({movie.like_qty})
            </span>
          </div>

          <div className={styles['detail-left__infor-block']}>
            <div className={styles['detail-left__infor-block__icon']}>
              <CustomImage
                src='/icon/eye.png'
                alt='eye icon'
              />
            </div>
            <span className={styles['detail-left__infor-block__text']}>
              Lượt xem({movie.views})
            </span>
          </div>
        </div>
      </div>

      <div className={styles['detail-right']}>
        <header className={styles['header']}>
          <div className={styles['header-top']}>
            <h1 className={styles['title']}>{movie.name}</h1>
            <MovieRating />
          </div>
          <div className={styles['header-bottom']}>
            <span className={styles['prop']}>{movie.year} </span>
            <span className={styles['saperator']}></span>
            <span className={styles['prop']}>
              {movie.hours > 0 && `${movie.hours} giờ`}{' '}
              {movie.minutes > 0 && `${movie.minutes} phút`}
            </span>
          </div>
        </header>

        <MovieActions
          type={movie.type}
          slug={movie.slug}
          isFavourite={movie.isFavourite}
        />
        <div className={styles['detail-content']}>
          <MovieTabs movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
