'use client';
import { useRouter } from 'next/navigation';
import { useMovieDetail } from '@/services/useMovie';
import Episode from './episode';
import styles from './styles.module.scss';
import { createRandomArray } from '@/utils/randomArray';
import EpisodeSkeleton from './skeleton';
import { useMovieModalStore } from '@/store/useMovieModal';

function MainEpisodeModal({
  movieSlug,
  closeModal,
}: {
  movieSlug: string;
  closeModal: () => void;
}) {
  const { data, isLoading } = useMovieDetail(movieSlug);
  const router = useRouter();
  const { closeModal: closeMovieModal, isOpen: isMovieModalOpen } = useMovieModalStore();

  /* Handle watch movie */
  const handleWatch = (slug: string) => {
    closeModal();
    isMovieModalOpen && closeMovieModal();
    router.push(`/watch/${movieSlug}?episode-slug=${slug}`);
  };

  return (
    <div className={styles['episode-modal']}>
      {isLoading
        ? createRandomArray(4).map((v) => <EpisodeSkeleton key={v} />)
        : data?.episodes.map((e, index) => (
            <Episode
              episode={e}
              key={e.slug + index}
              handleWatch={handleWatch}
              thumb={data.thumb_url}
              order={index + 1}
            />
          ))}
    </div>
  );
}

export default MainEpisodeModal;
