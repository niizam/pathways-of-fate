import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useGameStore = create((set) => ({
  characters: [],
  inventory: [],
  battleState: null,
  setCharacters: (characters) => set({ characters }),
  setInventory: (inventory) => set({ inventory }),
  setBattleState: (battleState) => set({ battleState }),
}));
