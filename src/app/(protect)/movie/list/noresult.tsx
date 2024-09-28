import Image from 'next/legacy/image';
import styles from './styles.module.scss';

function NoResult() {
  return (
    <div className={styles['not-found']}>
      <Image
        src={'/img/no-search-found.webp'}
        alt=''
        layout='fill'
        objectFit='contain'
      />
    </div>
  );
}

export default NoResult;
