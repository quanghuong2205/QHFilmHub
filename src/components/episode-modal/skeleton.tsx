import classNames from 'classnames';
import styles from './styles.module.scss';

function EpisodeSkeleton() {
  return (
    <div className={styles['skeleton']}>
      <div className='skeleton'></div>
    </div>
  );
}

export default EpisodeSkeleton;
