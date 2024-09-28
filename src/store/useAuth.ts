import { create } from 'zustand';

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUserInfor: (user) => set(() => ({ user })),
}));
