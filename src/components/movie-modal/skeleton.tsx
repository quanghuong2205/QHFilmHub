import classNames from 'classnames';
import styles from './styles.module.scss';
function MovieModalSkeleton() {
  return (
    <div
      className={styles['skeleton']}
      style={{ borderRadius: 8 }}>
      <div className='skeleton'></div>
      <div className='skeleton'></div>
    </div>
  );
}

export default MovieModalSkeleton;
