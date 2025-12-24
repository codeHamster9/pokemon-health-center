import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

interface TrendFilters {
    timeRange: string;
    groupBy: string;
    type?: string;
    pokemonId?: string;
}

export const usePokemonMetrics = (filters?: TrendFilters) => {
    const checkinTrends = useQuery({
        queryKey: ['checkin-trends', filters],
        queryFn: () => pokemonApi.getCheckinTrends(
            filters?.timeRange || '7d',
            filters?.groupBy || 'day',
            filters?.type,
            filters?.pokemonId
        ),
        enabled: !!filters, // Only run if filters are provided, or change logic to run always with defaults
    });

    const machineMetrics = useQuery({
        queryKey: ['machine-metrics'],
        queryFn: () => pokemonApi.getMachineMetrics(),
    });

    const leaderboards = useQuery({
        queryKey: ['leaderboards'],
        queryFn: pokemonApi.getLeaderboards,
    });

    return {
        checkinTrends,
        machineMetrics,
        leaderboards,
    };
};
