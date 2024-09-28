'use client';
import styles from './styles.module.scss';
import Bell from '@/Icon/Bell';
import User from './user-item';
import classNames from 'classnames';
import MovieSearch from '@/components/search';
import { useAuthStore } from '@/store/useAuth';

function Header({ isCollapsed }: { isCollapsed?: boolean }) {
  const { user } = useAuthStore();

  return (
    <header
      className={classNames({
        [styles['header']]: true,
        [styles['collapse']]: isCollapsed,
      })}>
      <div className='container'>
        <div className={styles['header-inner']}>
          <MovieSearch />
          <div className={styles['header-right']}>
            <button>
              <Bell
                width={18}
                height={18}
              />
            </button>
            <span className={styles['user-name']}>{user?.name || 'quanghuong'}</span>
            <User user={user!} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
