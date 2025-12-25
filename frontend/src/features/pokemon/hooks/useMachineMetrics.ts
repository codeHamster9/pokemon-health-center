import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

export const useMachineMetrics = () => {
    return useQuery({
        queryKey: ['machine-metrics'],
        queryFn: () => pokemonApi.getMachineMetrics(),
    });
};
