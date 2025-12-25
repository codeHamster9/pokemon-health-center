import { useMemo } from 'react';
import { Users } from 'lucide-react';
import { Machine } from '../api/pokemonApi';
import { PokemonStatCard } from './PokemonStatCard';

interface PokemonTotalCheckinsCardProps {
    machines: Machine[];
}

export function PokemonTotalCheckinsCard({ machines }: PokemonTotalCheckinsCardProps) {
    const totalCheckins = useMemo(() => {
        return machines.reduce((acc, m) => acc + (m.total_checkins || 0), 0);
    }, [machines]);

    return (
        <PokemonStatCard
            title="Total Check-ins"
            value={totalCheckins.toLocaleString()}
            icon={Users}
            description={<span className="text-green-500 font-medium">+12% from last week</span>}
        />
    );
}
