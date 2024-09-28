'use client';
import styles from './styles.module.scss';
import CustomImage from '@/components/custom-image';
import classNames from 'classnames';
import { navLinks } from './links';
import NavItem from './item';
import { useSearchParams } from 'next/navigation';

function Sidebar({ isCollapsed }: { isCollapsed?: boolean }) {
  const params = useSearchParams();
  const type = params.get('type') || '';

  return (
    <div
      className={classNames({
        [styles['collapse']]: isCollapsed,
      })}>
      <div className={styles['sidebar-top']}>
        <div className={styles['sidebar-logo']}>
          <CustomImage
            src='/img/logo.png'
            alt='logo'
            objectFit='contain'
          />
        </div>
      </div>
      <nav className={styles['nav']}>
        <div className={styles['nav-group']}>
          <h3 className={styles['nav-group__title']}>Khác</h3>
          <ul>
            <NavItem
              isActive={type === ''}
              link={{
                path: '/',
                name: 'Trang chủ',
                iconPath: '/icon/home.png',
                iconName: 'home',
              }}
            />
          </ul>
        </div>

        <div className={styles['nav-group']}>
          <h3 className={styles['nav-group__title']}>Phim</h3>
          <ul>
            {navLinks.map((link) => (
              <NavItem
                key={link.path}
                link={link}
                isActive={type !== '' && link.path.endsWith(type)}
              />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
