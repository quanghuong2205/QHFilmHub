import { LOCAL_STORAGE_KEY } from '@/constant/local-storage-key.const';
import { decodeToken } from '@/utils/decodeToken';
import { listenEvent } from '@/utils/event';
import { useCallback, useEffect, useRef, useState } from 'react';

interface IUseSaveMovie {
  slug: string;
  isPlay: boolean;
  player: any;
  playedSecs: any;
}

function useSaveMovie({ slug, isPlay, player, playedSecs }: IUseSaveMovie) {
  const [timeText, setTimeText] = useState<string | undefined>(undefined);
  const seekTo = useRef(0);
  const user = useRef<ITokenPayload | undefined>(decodeToken());

  /* Handle to get saved movies */
  const handleGetSavedMovie = useCallback(() => {
    /* Get user id */
    const userId = user.current?._id!;

    /* Get saved movies */
    const playedMovies: any = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY.PLAYED_TIME) ??
        JSON.stringify({
          [userId]: [],
        }),
    );

    /* Played movies of current user */
    const playedMoviesOfUser = playedMovies[userId];

    /* Return */
    return {
      existedMovie: playedMoviesOfUser.find((m: any) => m.slug === slug),
      playedMovies,
      playedMoviesOfUser,
    };
  }, [slug]);

  /* Handle to save movie time */
  const handleSaveMovie = useCallback(() => {
    if (!playedSecs.current) return;

    /* Get user id */
    const userId = user.current?._id!;

    /* If movie has been saved before */
    const { existedMovie, playedMovies, playedMoviesOfUser } = handleGetSavedMovie();

    /* Has watched */
    if (existedMovie) {
      existedMovie.playedSeconds = playedSecs.current;
      return localStorage.setItem(
        LOCAL_STORAGE_KEY.PLAYED_TIME,
        JSON.stringify({
          ...playedMovies,
          [userId]: playedMoviesOfUser,
        }),
      );
    }

    /* Not watched */
    localStorage.setItem(
      LOCAL_STORAGE_KEY.PLAYED_TIME,
      JSON.stringify({
        ...playedMovies,
        [userId]: [...playedMoviesOfUser, { slug, playedSeconds: playedSecs.current }],
      }),
    );
  }, [handleGetSavedMovie, playedSecs, slug]);

  /* Save movie time when user leave page */
  useEffect(() => {
    const event = listenEvent('beforeunload', handleSaveMovie);
    return event;
  }, [handleSaveMovie]);

  /* Check if movie has been watched before */
  useEffect(() => {
    /* Format time */
    const fm = (t: number) => (t < 10 ? `0${t}` : `${t}`);

    /* Get saved movies */
    const { existedMovie } = handleGetSavedMovie();

    /* Movie has been saved */
    if (existedMovie) {
      const playedSeconds = existedMovie.playedSeconds;
      const hours = Math.floor(playedSeconds / 3600);
      const minutes = Math.floor((playedSeconds - hours * 3600) / 60);
      const seconds = Math.floor(playedSeconds - hours * 3600 - minutes * 60);

      setTimeText(`Tiếp tục xem [${fm(hours)} : ${fm(minutes)} : ${fm(seconds)}]`);
      seekTo.current = playedSeconds;
    }
  }, [handleGetSavedMovie]);

  /* Save state of isPlay to use in setInterval */
  const isPlayRef = useRef<boolean>(false);
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay]);

  /**
   * Seek to saved time of the movie
   *    re-try utils the movie is ready
   */
  const timeId = useRef<NodeJS.Timeout | undefined>(undefined);
  const interval = useRef<number>(0);
  const RETRY_TIMES = 10;
  const handleSeekTo = () => {
    /* Video has been ready to play */
    if (isPlayRef.current) {
      return player?.current?.seekTo(seekTo.current);
    }

    /* Re-try until video is ready */
    timeId.current = setInterval(() => {
      if (interval.current >= RETRY_TIMES) {
        clearInterval(timeId.current);
        timeId.current = undefined;
      }

      if (isPlayRef.current) {
        player?.current?.seekTo(seekTo.current);
        clearInterval(timeId.current);
        timeId.current = undefined;
      }

      interval.current += 1;
    }, 1500);
  };

  return {
    timeText,
    handleSeekTo,
    handleSaveMovie,
  };
}

export default useSaveMovie;
