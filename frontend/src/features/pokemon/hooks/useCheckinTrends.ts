import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

interface TrendFilters {
    timeRange: string;
    groupBy: string;
    type?: string;
    pokemonId?: string;
}

export const useCheckinTrends = (filters?: TrendFilters) => {
    return useQuery({
        queryKey: ['checkin-trends', filters],
        queryFn: () => pokemonApi.getCheckinTrends(
            filters?.timeRange || '7d',
            filters?.groupBy || 'day',
            filters?.type,
            filters?.pokemonId
        ),
        enabled: !!filters,
    });
};
