interface IAuthForm {
  email: string;
  password: string;
  name?: string | undefined;
}
type AuthField = 'email' | 'password' | 'name';

interface ITokenPayload {
  email: string;
  exp: number;
  name: string;
  role: string;
  _id: string;
}

type MovieType = 'phim-le' | 'phim-bo' | 'hoat-hinh' | 'tv-shows';

interface IMovieModalStore {
  isOpen: boolean;
  slug: string | undefined;
  setMovieSlug: (slug: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

interface IEpisode {
  name: string;
  slug: string;
  link_m3u8: string;
  link_embed: string;
  filename: string;
}

interface IEpisodeModalStore {
  isOpen: boolean;
  movieSlug: string;
  setMovieSlug: (movieSlug: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

interface IUser {
  _id: string;
  name: string;
  avatar_url: string;
  role: string;
}

interface IAuthStore {
  user: IUser | null;
  setUserInfor: (user: IUser | null) => void;
}

interface IconProps {
  width?: number;
  height?: number;
}

interface IMovieProps {
  _id: string;
  name: string;
  slug: string;
  type: string;
  thumb_url: string;
  category: string[];
  country: string[];
  hours: number;
  minutes: number;
  year: number;
  current_episode: text;
  isFavourite: boolean;
}

interface IMovieDetailProps {
  _id: string;
  name: string;
  slug: string;
  content: string;
  type: MovieType;
  status: string;
  poster_url: string;
  thumb_url: string;
  trailer_url: string;
  year: number;
  actor: string[];
  director: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  country: {
    id: string;
    name: string;
    slug: string;
  }[];
  hours: number;
  minutes: number;
  current_episode: number | null;
  total_episode: number | null;
  episodes: IEpisode[];
  current_episode: string;
  isFavourite: boolean;
  views: number;
  like_qty: number;
}

interface INavLink {
  path: string;
  name: string;
  iconPath: string;
  iconName: string;
  iconColor?: string;
}

interface IMovieSearch {
  name: string;
  slug: string;
  category: string[];
  poster_url: string;
}
