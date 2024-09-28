'use client';
import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import { useEffect } from 'react';

function PageLoading({ content }: { content?: string }) {
  useEffect(() => {
    const body = document.querySelector('body');
    body?.style.setProperty('overflow', 'hidden');
    return () => {
      body?.style.setProperty('overflow', 'auto');
    };
  }, []);
  return (
    <div className={styles.loading}>
      <div className={styles['loading-img']}>
        <Image
          src='/img/loading.png'
          alt='loading'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <span className={styles['loading-text']}>{content ?? 'Đang tải trang...'}</span>
    </div>
  );
}

export default PageLoading;
