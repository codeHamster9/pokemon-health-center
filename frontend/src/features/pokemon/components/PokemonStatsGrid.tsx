import { useMemo } from 'react';
import { Activity, Zap } from 'lucide-react';
import { useMachineMetrics } from "../hooks/useMachineMetrics";
import { PokemonStatCard } from './PokemonStatCard';
import { PokemonTotalCheckinsCard } from './PokemonTotalCheckinsCard';
import { PokemonTopMachineCard } from './PokemonTopMachineCard';

export function PokemonStatsGrid() {
    const { data: machines } = useMachineMetrics();

    const avgSuccessRate = useMemo(() => {
        if (machines.length === 0) return "0.0";
        return (machines.reduce((acc, m) => acc + (m.success_rate || 0), 0) / machines.length).toFixed(1);
    }, [machines]);

    const activeCount = useMemo(() => {
        return machines.filter(m => m.current_checkin).length;
    }, [machines]);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <PokemonTotalCheckinsCard machines={machines} />
            <PokemonStatCard
                title="Success Rate"
                value={`${avgSuccessRate}%`}
                icon={Activity}
                description={<span className="text-green-500 font-medium">+2.1% from yesterday</span>}
            />
            <PokemonStatCard
                title="Active Now"
                value={activeCount}
                icon={Zap}
                description={<span className="text-blue-500 font-medium animate-pulse">● Currently treating</span>}
            />
            <PokemonTopMachineCard machines={machines} />
        </div>
    );
}
