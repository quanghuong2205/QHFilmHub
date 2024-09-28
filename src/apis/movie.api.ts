import { instance } from '@/configs/axios.config';

interface IPagination {
  currentPage: number | undefined;
  totalItems: number | undefined;
  totalItemsPerPage: number | undefined;
  totalPages: number | undefined;
}

export const getRandomMovieApi = async (url: string): Promise<IMovieDetailProps> => {
  console.log('call api');
  return await instance.get('/movie/random');
};

export const getFavouriteMoviesApi = async (): Promise<IMovieProps[]> => {
  return await instance.get('/movie/favourite');
};

export const getRecentMoviesApi = async (): Promise<{
  movies: IMovieProps[];
}> => {
  return await instance.get('/movie/recent');
};

export const getMoviesByTypeApi = async (
  type: string,
  page?: number,
  limit?: number,
): Promise<{ movies: IMovieProps[]; pagination: IPagination }> => {
  return await instance.get(`/movie/${type}`, {
    params: {
      page: page || 1,
      limit: limit || 10,
    },
  });
};

export const getMovieDetailApi = async (slug: string): Promise<IMovieDetailProps> => {
  return await instance.get(`/movie/detail/${slug}`);
};

export const getTopMoviesApi = async (top: number): Promise<IMovieProps[]> => {
  return await instance.get(`/movie/top?limit=${top}`);
};

export const getMovieLinkApi = async (
  slug: string,
  episodeSlug?: string | null,
): Promise<{ link: string; name: string }> => {
  if (episodeSlug) {
    return await instance.get(`/movie/link/${slug}?episode-slug=${episodeSlug}`);
  }
  return await instance.get(`/movie/link/${slug}`);
};

export const likeMovieApi = async (slug: string): Promise<{ id: string }> => {
  return await instance.post(`/movie/like/${slug}`);
};

export const unlikeMovieApi = async (slug: string): Promise<{ id: string }> => {
  return await instance.delete(`/movie/unlike/${slug}`);
};

export const upViewApi = async (slug: string): Promise<{ id: string }> => {
  return await instance.patch(`/movie/view/${slug}`);
};

export const searchMovieApi = async (query: string): Promise<IMovieSearch[]> => {
  return await instance.get(`/movie/search?query=${query}`);
};
