import Link from 'next/link';
import styles from '../styles.module.scss';

interface IEpisodeProps {
  episodes: IEpisode[];
  movieSlug: string;
  current: number;
  total: number;
}
function Episode({ episodes, movieSlug, current, total }: IEpisodeProps) {
  return (
    <div className={styles['episode']}>
      <div className={styles['episode-props']}>
        <div className={styles['episode-prop']}>
          <span className={styles['episode-prop__title']}>Trạng thái:</span>
          <span className={styles['episode-prop__value']}>
            {current} / {total}
          </span>
        </div>
      </div>
      <div className={styles['episode-list']}>
        <h3 className={styles['episode-list__title']}>Danh sách:</h3>
        <div className={styles['episode-list__body']}>
          {episodes.map((e, i) => (
            <Link
              href={`/watch/${movieSlug}?episode-slug=${e.slug}`}
              key={e.link_m3u8}>
              {e.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Episode;
