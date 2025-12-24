import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonCheckins = () => {
    const queryClient = useQueryClient();

    const activeCheckins = useInfiniteQuery({
        queryKey: ['active-checkins'],
        queryFn: ({ pageParam = 1 }) => pokemonApi.getActiveCheckins(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length < 9 ? undefined : allPages.length + 1;
        },
        initialPageParam: 1,
        refetchInterval: 30000,
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
