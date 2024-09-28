import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classNames(styles['page'], 'page')}>
      <header className={styles['header']}>
        <div className='container'>
          <div className={styles['logo']}>
            <Image
              src={'/img/logo.png'}
              alt='QH movie logo'
              objectFit='cover'
              layout='fill'
            />
          </div>
        </div>
      </header>

      <main className={styles['main']}>{children}</main>
    </div>
  );
}

export default AuthLayout;
