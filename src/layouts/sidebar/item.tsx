import Link from 'next/link';
import styles from './styles.module.scss';
import CustomImage from '@/components/custom-image';
import classNames from 'classnames';

function NavItem({ link, isActive }: { link: INavLink; isActive: boolean }) {
  return (
    <li key={link.path}>
      <Link
        href={link.path}
        className={classNames(styles['nav-link'], {
          [styles['active']]: isActive,
        })}>
        <div
          className={styles['nav-icon']}
          style={{
            filter: link.iconColor ?? 'none',
          }}>
          <div>
            <CustomImage
              src={link.iconPath}
              alt={link.iconName}
              objectFit='contain'
            />
          </div>
        </div>
        <span className={styles['nav-text']}>{link.name}</span>
      </Link>
    </li>
  );
}

export default NavItem;
