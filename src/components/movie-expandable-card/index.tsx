import styles from './styles.module.scss';
import MovieCard from '../movie-card';
import CustomImage from '../custom-image';

interface ExpanableMovieCardProps {
  movie: IMovieProps;
  isShownExpanableCard?: boolean;
}

function ExpanableMovieCard({ movie, isShownExpanableCard = true }: ExpanableMovieCardProps) {
  return (
    <div
      className='col'
      key={movie._id}>
      <div className={styles['card']}>
        <CustomImage
          src={movie.thumb_url}
          alt={movie.name}
          className={styles['card-img']}
          loading='lazy'
        />

        <div className={styles['card__movie-name']}>
          <span className='line-clamp'>{movie.name}</span>
        </div>

        {isShownExpanableCard && (
          <div className={styles['card-infor__wrapper']}>
            <MovieCard {...movie} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpanableMovieCard;
