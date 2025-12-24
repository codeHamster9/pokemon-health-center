import { useState } from "react";
import { usePokemonMetrics } from "../../features/pokemon/hooks/usePokemonMetrics";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils";


export default function MachineMetrics() {
    const [baselineId, setBaselineId] = useState<string | undefined>(undefined);
    const { machineMetrics } = usePokemonMetrics(); // We might need to handle comparison logic either in hook or here

    // If baseline is selected, we might want to fetch comparison data specifically or just compute locally if we have all data
    // For now relying on the list returned by main endpoint. If comparison endpoint is critical:
    // We can add logic to fetch /compare when baselineId changes.
    // Actually hook `usePokemonMetrics` handles fetching machine metrics. 
    // Let's assume for this mock step we fetch simple list. 
    // REAL IMPLEMENTATION NOTE: The plan said /metrics/machines/compare?baseline_id=X
    // So we should probably expose a setter for baseline in the hook or separate query.

    // Let's just do client-side calculation for speed or update hook if strict. 
    // Plan said: "Dropdown to choose a baseline machine and see comparison deltas"
    // Let's implement client-side delta for immediate interactivity if data allows, 
    // or trigger refetch with baseline param.

    // Refetching approach:
    // We need to modify usePokemonMetrics or make a new specific query here.
    // Let's use the list we have and compute deltas client side for the UI speed, 
    // unless backend does complex stuff. Backend just compares success rate.

    const machines = machineMetrics.data || [];
    const baselineMachine = machines.find(m => m.id.toString() === baselineId);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Machine Metrics</h1>
                <div className="w-[250px]">
                    <Select onValueChange={setBaselineId} value={baselineId}>
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
                </div>
            </div>

            <div className="rounded-md border bg-card shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Machine</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Total Check-ins</TableHead>
                            <TableHead>Success Rate</TableHead>
                            <TableHead>Delta</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {machines.map((machine) => {
                            let delta = null;
                            let deltaColor = "text-muted-foreground";

                            if (baselineMachine && baselineMachine.id !== machine.id) {
                                const diff = (machine.success_rate || 0) - (baselineMachine.success_rate || 0);
                                delta = diff.toFixed(1) + "%";
                                if (diff > 0) deltaColor = "text-green-500";
                                if (diff < 0) deltaColor = "text-red-500";
                            }

                            return (
                                <TableRow key={machine.id}>
                                    <TableCell className="font-medium">{machine.name}</TableCell>
                                    <TableCell>{machine.location}</TableCell>
                                    <TableCell>{machine.total_checkins}</TableCell>
                                    <TableCell>{machine.success_rate}%</TableCell>
                                    <TableCell className={cn("font-medium", deltaColor)}>
                                        {delta || "—"}
                                    </TableCell>
                                    <TableCell>
                                        {machine.current_checkin ? (
                                            <div className="flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Treating {machine.current_checkin.pokemon?.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-green-500/20 text-green-500">
                                                Idle
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
