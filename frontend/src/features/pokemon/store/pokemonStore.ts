import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PokemonStore {
    filters: {
        timeRange: string;
        groupBy: string;
        segmentType: string;
        filterPokemon: string;
    };
    setFilter: (key: keyof PokemonStore['filters'], value: string) => void;
    resetFilters: () => void;
}

export const usePokemonStore = create<PokemonStore>()(
    persist(
        (set) => ({
            filters: {
                timeRange: '7d',
                groupBy: 'day',
                segmentType: 'all',
                filterPokemon: 'all',
            },
            setFilter: (key, value) =>
                set((state) => ({
                    filters: { ...state.filters, [key]: value },
                })),
            resetFilters: () =>
                set({
                    filters: {
                        timeRange: '7d',
                        groupBy: 'day',
                        segmentType: 'all',
                        filterPokemon: 'all',
                    },
                }),
        }),
        {
            name: 'pokemon-store',
            storage: createJSONStorage(() => localStorage),
        }
    ));
