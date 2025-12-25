import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

export const useLeaderboards = () => {
    return useQuery({
        queryKey: ['leaderboards'],
        queryFn: pokemonApi.getLeaderboards,
    });
};
