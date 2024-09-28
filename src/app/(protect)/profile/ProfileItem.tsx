'use client';

import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';

interface ProfileItemProps {
  imageUrl: string;
  text: string;
}

function ProfileItem({ imageUrl, text }: ProfileItemProps) {
  const router = useRouter();
  return (
    <div
      className={styles['item']}
      onClick={() => router.push('/')}>
      <div className={styles['item-img']}>
        <Image
          src={imageUrl}
          alt=''
          layout='fill'
        />
      </div>
      <span className={styles['item-text']}>{text}</span>
    </div>
  );
}

export default ProfileItem;
