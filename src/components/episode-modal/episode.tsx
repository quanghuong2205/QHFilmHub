import CustomImage from '../custom-image';
import styles from './styles.module.scss';

interface IEpisodeProps {
  order: number;
  episode: IEpisode;
  thumb: string;
  handleWatch: (slug: string) => void;
}

function Episode({ episode, handleWatch, thumb, order }: IEpisodeProps) {
  return (
    <button
      className={styles['episode-link']}
      onClick={() => handleWatch(episode.slug)}>
      <div className={styles.episode}>
        <span className={styles.order}>{order}</span>
        <div className={styles.body}>
          <div className={styles.thumb}>
            <div>
              <CustomImage
                alt={episode.name}
                src={thumb}
              />
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.name}>{episode.name}</p>
            <p className={styles.desc}>{episode.filename}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default Episode;
