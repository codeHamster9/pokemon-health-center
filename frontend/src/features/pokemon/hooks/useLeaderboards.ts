import { useSuspenseQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

export const useLeaderboards = () => {
    return useSuspenseQuery({
        queryKey: ['leaderboards'],
        queryFn: pokemonApi.getLeaderboards,
    });
};
