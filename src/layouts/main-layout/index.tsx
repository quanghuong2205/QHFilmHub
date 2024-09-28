'use client';
import CustomImage from '@/components/custom-image';
import Footer from '../footer';
import Sidebar from '../sidebar';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import Header from '../header';

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* Handle toggle collapse mode */
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={classNames({
        [styles['main-layout']]: true,
        [styles['collapse']]: isCollapsed,
      })}>
      <div>
        <div className={styles['sidebar']}>
          <Sidebar isCollapsed={isCollapsed} />
          <div
            role='button'
            onClick={handleToggleCollapse}
            className={styles['sidebar-collapse-icon']}>
            <CustomImage
              src='/icon/chevron-left.png'
              alt='chevron left'
            />
          </div>
        </div>

        <div className={styles['main']}>
          <Header isCollapsed={isCollapsed} />
          <main>
            <div className='container'>{children}</div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
