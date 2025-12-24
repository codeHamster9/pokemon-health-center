import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonCheckins = () => {
    const queryClient = useQueryClient();

    const activeCheckins = useQuery({
        queryKey: ['active-checkins'],
        queryFn: pokemonApi.getActiveCheckins,
        refetchInterval: 30000, // Poll every 30 seconds
    });

    const dismissCheckin = useMutation({
        mutationFn: pokemonApi.dismissCheckin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['active-checkins'] });
            // Also invalidate dashboard stats if we had a lighter query for that
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        },
    });

    return {
        activeCheckins,
        dismissCheckin,
    };
};
