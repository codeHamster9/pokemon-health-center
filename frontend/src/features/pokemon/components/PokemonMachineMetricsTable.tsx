import { cn } from "@/lib/utils";
import { usePokemonMachineMetrics } from "../hooks/usePokemonMachineMetrics";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface PokemonMachineMetricsTableProps {
    baselineId?: string;
}

export function PokemonMachineMetricsTable({ baselineId }: PokemonMachineMetricsTableProps) {
    const { data: machines } = usePokemonMachineMetrics();

    const baselineMachine = machines.find(m => m.id?.toString() === baselineId);

    return (
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
    );
}
