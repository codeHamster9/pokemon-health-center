import { create } from 'zustand';

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

export const usePokemonStore = create<PokemonStore>((set) => ({
    filters: {
        timeRange: 'all',
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
                timeRange: 'all',
                groupBy: 'day',
                segmentType: 'all',
                filterPokemon: 'all',
            },
        }),
}));
