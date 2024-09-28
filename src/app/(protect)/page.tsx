import styles from './styles.module.scss';
import BillBoard from './_components/bill-board';
import MovieListV1 from '@/components/movie-list-v1';
import MovieModal from '@/components/movie-modal';
import MainLayout from '@/layouts/main-layout';
import EpisodeModal from '@/components/episode-modal';
import TopMovieList from '@/components/top-movie-list';

export default function Home() {
  return (
    <MainLayout>
      <MovieModal />
      <EpisodeModal />
      <BillBoard />
      <div className={styles['movie-group']}>
        <TopMovieList top={5} />

        <MovieListV1
          title='Phim lẻ'
          type='phim-le'
          limit={5}
        />
      </div>
    </MainLayout>
  );
}
