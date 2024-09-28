'use client';
import styles from '../styles.module.scss';
import Overview from './overview';
import Episode from './episode';
import RelatedMovies from './relation';
import Tabs from '@/components/tabs';

function MovieTabs({ movie }: { movie: IMovieDetailProps }) {
  return (
    <Tabs>
      <Tabs.TabTitles>
        <Tabs.TabTitle
          title='Cốt truyện'
          order={0}
        />

        <Tabs.TabTitle
          title='Chi tiết'
          order={1}
        />

        <Tabs.TabTitle
          title='Phim cùng thể loại'
          order={2}
        />

        {movie?.type !== 'phim-le' && (
          <Tabs.TabTitle
            title='Danh sách tập'
            order={3}
          />
        )}
      </Tabs.TabTitles>
      <Tabs.TabBody>
        <Tabs.Tab>
          <p className={styles['plot']}>{movie.content}</p>
        </Tabs.Tab>

        <Tabs.Tab>
          <Overview movie={movie} />
        </Tabs.Tab>

        <Tabs.Tab style={{ display: 'flex' }}>
          <RelatedMovies type={movie.type} />
        </Tabs.Tab>

        {movie?.type !== 'phim-le' ? (
          <Episode
            episodes={movie.episodes}
            movieSlug={movie.slug}
            current={movie?.current_episode || 0}
            total={movie?.total_episode || 0}
          />
        ) : (
          <></>
        )}
      </Tabs.TabBody>
    </Tabs>
  );
}

export default MovieTabs;
