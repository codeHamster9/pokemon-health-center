import { useSuspenseQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

interface TrendFilters {
    timeRange: string;
    groupBy: string;
    type?: string;
    pokemonId?: string;
}

export const usePokemonCheckinTrends = (filters: TrendFilters) => {
    return useSuspenseQuery({
        queryKey: ['checkin-trends', filters],
        queryFn: () => pokemonApi.getCheckinTrends(
            filters.timeRange,
            filters.groupBy,
            filters.type,
            filters.pokemonId
        ),
    });
};
