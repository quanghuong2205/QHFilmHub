'use client';
import styles from './styles.module.scss';
import PlayButton from '@/components/play-button';
import MoreInforButton from '@/components/more-infor-button';
import { useRandomMovie } from '@/services/useMovie';
import CustomImage from '@/components/custom-image';

function BillBoard() {
  const { data, isLoading } = useRandomMovie();

  if (isLoading || !data) {
    return (
      <div className={styles['bill-board']}>
        <div className='skeleton'></div>
      </div>
    );
  }

  return (
    <div className={styles['bill-board']}>
      <div className={styles['bill-board__media']}>
        <CustomImage
          src={data?.thumb_url}
          alt={data?.name}
          priority
          objectFit='cover'
          objectPosition='center'
        />
      </div>

      <div className={styles['poster']}>
        <CustomImage
          src={data?.poster_url}
          alt={data?.name}
          priority
          objectFit='cover'
          objectPosition='center'
        />
      </div>

      <div className={styles['content']}>
        <div className={styles['content-infor']}>
          <h1
            className='line-clamp'
            style={{
              ['--line-clamp' as any]: 2,
            }}>
            {data?.name}
          </h1>
          <p
            className='line-clamp'
            style={{
              ['--line-clamp' as any]: 3,
            }}>
            {data?.content}
          </p>
        </div>

        <div className={styles['content-act']}>
          <PlayButton
            slug={data?.slug}
            type={data?.type}
          />
          <MoreInforButton slug={data.slug} />
        </div>
      </div>
    </div>
  );
}

export default BillBoard;
