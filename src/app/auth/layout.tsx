import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { Suspense } from 'react';
import PageLoading from '@/components/page-loading';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className={classNames(styles['page'], 'page')}>
        <div className={styles['cover']}>
          <Image
            src={'/img/cover.jpg'}
            alt='QH movie cover image'
            objectFit='cover'
            layout='fill'
          />
        </div>

        <header className={styles['header']}></header>

        <main className={styles['main']}>{children}</main>
      </div>
    </Suspense>
  );
}

export default AuthLayout;
