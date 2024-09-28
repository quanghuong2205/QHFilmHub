import { create } from 'zustand';

export const useMovieModalStore = create<IMovieModalStore>((set) => ({
  isOpen: false,
  slug: undefined,
  setMovieSlug: (slug) => set(() => ({ slug })),
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ slug: undefined, isOpen: false })),
}));
