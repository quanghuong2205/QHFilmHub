import styles from '../styles.module.scss';

function Overview({ movie }: { movie: IMovieDetailProps }) {
  return (
    <div className={styles['overview']}>
      <div className={styles['overview-props']}>
        <div className={styles['overview-prop']}>
          <span className={styles['overview-prop__name']}>Thể loại:</span>
          <p className={styles['overview-prop__value']}>
            {movie.category.map((c) => c.name).join(', ')}
          </p>
        </div>

        <div className={styles['overview-prop']}>
          <span className={styles['overview-prop__name']}>Diễn viên:</span>
          <p className={styles['overview-prop__value']}>{movie.actor.join(', ')}</p>
        </div>

        <div className={styles['overview-prop']}>
          <span className={styles['overview-prop__name']}>Quốc gia:</span>
          <p className={styles['overview-prop__value']}>
            {movie.country.map((c) => c.name).join(', ')}
          </p>
        </div>

        <div className={styles['overview-prop']}>
          <span className={styles['overview-prop__name']}>Đạo diễn:</span>
          <p className={styles['overview-prop__value']}>{movie.director.join(', ')}</p>
        </div>

        {movie.total_episode && (
          <div className={styles['overview-prop']}>
            <span className={styles['overview-prop__name']}>Trạng thái:</span>
            <p className={styles['overview-prop__value']}>
              <span>{movie.current_episode}</span>/<span>{movie.total_episode}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;
