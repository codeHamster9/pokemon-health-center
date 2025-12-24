import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Checkin } from "../api/pokemonApi";

interface CheckinCardProps {
    checkin: Checkin;
    onDismiss: (checkin: Checkin) => void;
}

export function CheckinCard({ checkin, onDismiss }: CheckinCardProps) {
    const healthPercent = Math.min((checkin.initial_hp / checkin.max_hp) * 100, 100);
    let healthColor = "bg-green-500";
    if (healthPercent < 30) healthColor = "bg-red-500";
    else if (healthPercent < 70) healthColor = "bg-yellow-500";

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow transition-colors hover:border-primary/50 group h-full">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            ⚡
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{checkin.pokemon?.name || 'Unknown'}</h3>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                {checkin.pokemon?.type_primary}
                            </span>
                        </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(checkin.arrived_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Machine {checkin.machine_id}</span>
                        <span className="font-medium">{checkin.initial_hp} / {checkin.max_hp} HP</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                            className={`h-full ${healthColor} animate-pulse`}
                            style={{ width: `${healthPercent}%` }}
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <Button variant="outline" className="w-full">Details</Button>
                    <Button className="w-full" onClick={() => onDismiss(checkin)}>
                        Mark Healed
                    </Button>
                </div>
            </div>
        </div>
    );
}
