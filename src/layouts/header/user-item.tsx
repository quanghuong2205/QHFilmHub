'use client';
import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import Triangle from '@/Icon/Triangle';
import { Tooltip } from 'react-tooltip';
import LogoutButton from './signout-button';
function User({ user }: { user: IUser }) {
  return (
    <>
      <div
        className={styles['user']}
        data-tooltip-id='my-tooltip'>
        <div className={styles['user-avatar']}>
          <Image
            src={user?.avatar_url || '/img/avatar-placeholder.jpg'}
            alt=''
            objectFit='cover'
            layout='fill'
          />
        </div>
        <Triangle />
      </div>

      <Tooltip
        id='my-tooltip'
        style={{ padding: 0, borderRadius: 8 }}
        clickable
        place='bottom-end'
        offset={14}
        noArrow
        openOnClick>
        <div className={styles['user-menu']}>
          <ul>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </Tooltip>
    </>
  );
}

export default User;
