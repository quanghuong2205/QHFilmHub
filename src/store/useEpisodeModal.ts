import { create } from 'zustand';

export const useEpisodeModalStore = create<IEpisodeModalStore>((set) => ({
  isOpen: false,
  movieSlug: '',
  setMovieSlug: (movieSlug: string) => set(() => ({ movieSlug })),
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ movieSlug: '', isOpen: false })),
}));
