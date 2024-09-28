import styles from './styles.module.scss';
import PlayButton from '../play-button';
import FavoriteButton from '../favorite-button';
import MoreInforButton from '../more-infor-button';
import CustomImage from '../custom-image';
import classNames from 'classnames';

function MovieCard(props: IMovieProps) {
  return (
    <div className={styles['card-infor']}>
      <div className={styles['card-infor__img']}>
        <CustomImage
          src={props.thumb_url}
          alt={props.name}
          className={styles['card-img']}
          loading='lazy'
        />
      </div>

      <div className={styles['card-infor__body']}>
        <div className={styles['card-infor__act']}>
          <PlayButton
            slug={props?.slug}
            type={props?.type}
            variant='v2'
          />
          <FavoriteButton
            slug={props.slug}
            isFavourite={props.isFavourite}
          />
          <MoreInforButton
            className='pull-right'
            slug={props?.slug}
            variant='v2'
          />
        </div>

        <div className={styles['movie-prop']}>
          <div className={styles['movie-prop__group']}>
            <span className={styles['movie-prop__label']}>Thời lượng:</span>
            <span className={styles['movie-prop__value']}>
              {props?.hours} giờ {props?.minutes} phút
            </span>
          </div>
          <div
            className={classNames({
              [styles['movie-prop__group']]: true,
              ['line-clamp']: true,
            })}>
            <span className={styles['movie-prop__label']}>Thể loại:</span>
            <span className={styles['movie-prop__value']}>{props?.category.join(', ')}</span>
          </div>
          {props?.current_episode && (
            <div className={styles['movie-prop__group']}>
              <span className={styles['movie-prop__label']}>Trạng thái:</span>
              <span className={styles['movie-prop__value']}>{props.current_episode}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
