import { Suspense, useState } from "react";
import { useMachineMetrics } from "@/features/pokemon/hooks/useMachineMetrics";
import { PokemonMachineMetricsTable } from "@/features/pokemon/components/PokemonMachineMetricsTable";
import { PokemonTableSkeleton } from "@/features/pokemon/components/PokemonTableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Separate component to fetch machines for the dropdown (uses Suspense)
function BaselineSelector({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
    const { data: machines } = useMachineMetrics();

    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
                <SelectValue placeholder="Compare to Baseline..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {machines.map(m => (
                    <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default function MachineMetrics() {
    const [baselineId, setBaselineId] = useState<string | undefined>(undefined);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Machine Metrics</h1>
                <div className="w-[250px]">
                    <Suspense fallback={<Skeleton className="h-10 w-full rounded-md" />}>
                        <BaselineSelector value={baselineId} onChange={setBaselineId} />
                    </Suspense>
                </div>
            </div>

            <Suspense fallback={<PokemonTableSkeleton />}>
                <PokemonMachineMetricsTable baselineId={baselineId} />
            </Suspense>
        </div>
    )
}
