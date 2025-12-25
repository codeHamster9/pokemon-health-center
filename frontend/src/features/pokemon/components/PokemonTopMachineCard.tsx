import { useMemo } from 'react';
import { Zap } from 'lucide-react';
import { Machine } from '../api/pokemonApi';
import { PokemonStatCard } from './PokemonStatCard';

interface PokemonTopMachineCardProps {
    machines: Machine[];
}

export function PokemonTopMachineCard({ machines }: PokemonTopMachineCardProps) {
    const topMachine = useMemo(() => {
        return machines.reduce((prev, current) => {
            return (prev.success_rate || 0) > (current.success_rate || 0) ? prev : current
        }, { name: 'N/A', success_rate: 0 } as Partial<Machine>);
    }, [machines]);

    return (
        <PokemonStatCard
            title="Top Machine"
            value={topMachine.name || 'N/A'}
            icon={Zap}
            description={`${topMachine.success_rate || 0}% success rate`}
        />
    );
}
