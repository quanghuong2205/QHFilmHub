'use client';
import Image from 'next/legacy/image';
import styles from './styles.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactPlayer from 'react-player';
import { useRef, useState } from 'react';
import { useMovieLink } from '@/services/useMovie';
import ConfirmModal from '@/components/comfirm-modal';
import useSaveMovie from './movie-saving.hook';
import useUpView from './upview.hook';
import PageLoading from '@/components/page-loading';

function Watch({ params: { slug } }: { params: { slug: string } }) {
  /* Player state */
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const playedSecs = useRef<number>(0);
  const player = useRef<any | undefined>(undefined);

  /* Movie params information */
  const router = useRouter();
  const searchParams = useSearchParams();
  const episodeSlug = searchParams.get('episode-slug');

  /* Fetch movie data */
  const { data, isLoading, isValidating } = useMovieLink(slug, episodeSlug);

  /* Up movie view */
  useUpView({ isPlay, slug, minutes: 10 });

  /* Save watching time */
  const { handleSeekTo, timeText, handleSaveMovie } = useSaveMovie({
    isPlay,
    slug,
    player,
    playedSecs,
  });

  /* Handle back to prev movie list page */
  const handleBack = () => {
    handleSaveMovie();
    router.back();
  };

  if (isLoading || isValidating || !data) return <PageLoading content='Chờ tải phim...' />;
  return (
    <div className={styles['watcher']}>
      <ConfirmModal
        isOpen={!!timeText}
        message={timeText || ''}
        desc='Chúng tôi nhận thấy bạn đã trải nhiệm bộ phim này. Bạn có muốn tiếp tục?'
        onOK={handleSeekTo}
      />

      <header>
        <button
          className={styles['watcher-back']}
          onClick={handleBack}>
          <Image
            src='/icon/chevron-left.png'
            layout='fill'
            alt='chevron left icon'
          />
        </button>
        <p>
          Đang theo dõi: <span>{data?.name}</span>
        </p>
      </header>

      <ReactPlayer
        ref={player}
        controls
        playing={isPlay}
        onReady={() => setIsPlay(true)}
        width='100%'
        height='auto'
        onProgress={({ playedSeconds }) => {
          playedSecs.current = playedSeconds;
        }}
        url={data?.link}
      />
    </div>
  );
}

export default Watch;
