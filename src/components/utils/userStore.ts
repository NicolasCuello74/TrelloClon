import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
    name: string;
    setName: (name: string) => void;
};

export const useUserStore = create<Store, [['zustand/persist', Store]]>(
    persist(
        (set) => ({
            name: 'Usuario', // Valor inicial
            setName: (name) => set(() => ({ name })),
        }),
        {
            name: 'user-storage',
        }
    )
)