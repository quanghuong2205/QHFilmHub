import CustomImage from '@/components/custom-image';
import styles from '../styles.module.scss';
import { createRandomArray } from '@/utils/randomArray';

function MovieRating() {
  return (
    <div className={styles['star']}>
      <span>( 5 )</span>
      {createRandomArray(5).map((id) => (
        <div
          key={id}
          className={styles['star-item']}>
          <CustomImage
            src='/icon/star.png'
            alt=''
          />
        </div>
      ))}
    </div>
  );
}

export default MovieRating;
