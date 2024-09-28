import {
  getFavouriteMoviesApi,
  getMovieDetailApi,
  getMovieLinkApi,
  getMoviesByTypeApi,
  getRandomMovieApi,
  getTopMoviesApi,
  likeMovieApi,
  searchMovieApi,
  unlikeMovieApi,
  upViewApi,
} from '@/apis/movie.api';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

export const FAVOURITE_MOVIES = '/user/favourite';
export const RANDOM_MOVIE = '/movie/random';
export const MOVIES_BY_TYPE = '/movie/:type';
export const MOVIE_DETAIL = '/movie/detail/:slug';
export const MOVIE_LINK = '/movie/link/:slug';
export const LIKE_MOVIE = '/movie/like/:slug';
export const UNLIKE_MOVIE = '/movie/unlike/:slug';
export const UP_VIEW_MOVIE = '/movie/view/:id';
export const TOP_MOVIE = '/movie/top';
export const MOVIE_SEARCH = '/movie/search';

export function useMoviesByType(type: MovieType, page?: number, limit?: number, mark?: string) {
  const key = `${MOVIES_BY_TYPE}/${type}/${mark}/${page}`;
  return useSWR(key, async () => await getMoviesByTypeApi(type, page, limit), {
    revalidateOnFocus: false,
  });
}

export function useFavouriteMovies() {
  return useSWR(FAVOURITE_MOVIES, async () => await getFavouriteMoviesApi(), {
    revalidateOnFocus: false,
  });
}

export function useRandomMovie() {
  return useSWR(RANDOM_MOVIE, getRandomMovieApi, { revalidateOnFocus: false });
}

export function useMovieDetail(slug: string) {
  return useSWR(`${MOVIE_DETAIL}/${slug}`, async () => await getMovieDetailApi(slug), {
    revalidateOnFocus: false,
  });
}

export function useTopMovies(top: number) {
  return useSWR(`${TOP_MOVIE}?limit=${top}`, async () => await getTopMoviesApi(top), {
    revalidateOnFocus: false,
  });
}

export function useMovieSearch(query: string) {
  return useSWR(`${MOVIE_SEARCH}?query=${query}`, async () => await searchMovieApi(query), {
    revalidateOnFocus: false,
  });
}

export function useMovieLink(slug: string, episodeSlug?: string | null) {
  return useSWR(`${MOVIE_LINK}/${slug}`, async () => await getMovieLinkApi(slug, episodeSlug), {
    revalidateOnFocus: false,
  });
}

export function useLikeMovie(slug: string) {
  const { data, isMutating, error, reset, trigger } = useSWRMutation(LIKE_MOVIE, async () => {
    return await likeMovieApi(slug);
  });

  if (!isMutating && data) {
    mutate(FAVOURITE_MOVIES);
  }

  return { data, isMutating, error, reset, trigger };
}

export function useUnlikeMovie(slug: string) {
  const { data, isMutating, error, reset, trigger } = useSWRMutation(UNLIKE_MOVIE, async () => {
    return await unlikeMovieApi(slug);
  });

  if (!isMutating && data) {
    mutate(FAVOURITE_MOVIES);
  }

  return { data, isMutating, error, reset, trigger };
}

export function useUpviewMovie(slug: string) {
  return useSWRMutation(UP_VIEW_MOVIE, async (url, {}) => {
    return await upViewApi(slug);
  });
}
