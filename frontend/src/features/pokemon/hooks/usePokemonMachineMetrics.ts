import { useSuspenseQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonMachineMetrics = () => {
    return useSuspenseQuery({
        queryKey: ['machine-metrics'],
        queryFn: () => pokemonApi.getMachineMetrics(),
    });
};
