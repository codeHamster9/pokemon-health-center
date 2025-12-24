import { useState, useEffect, useRef } from "react";
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { usePokemonCheckins } from "../../features/pokemon/hooks/usePokemonCheckins";
import { PokemonDismissDialog } from "../../features/pokemon/components/PokemonDismissDialog";
import { Checkin } from "../../features/pokemon/api/pokemonApi";
import { Button } from "@/components/ui/button";
import { Activity, Clock } from "lucide-react";

export default function ActiveCheckins() {
    const { activeCheckins, dismissCheckin } = usePokemonCheckins();
    const [selectedCheckin, setSelectedCheckin] = useState<Checkin | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDismissClick = (checkin: Checkin) => {
        setSelectedCheckin(checkin);
        setDialogOpen(true);
    };

    const handleConfirmDismiss = () => {
        if (selectedCheckin) {
            dismissCheckin.mutate(selectedCheckin.id);
        }
    };

    // Auto-scroll logic
    const prevCountRef = useRef(0);
    // Flatten pages
    const checkins = activeCheckins.data?.pages.flatMap((page) => page) || [];

    useEffect(() => {
        const currentCount = checkins.length;
        if (currentCount > prevCountRef.current && prevCountRef.current > 0) {
            // Data added (and not initial load), scroll to bottom
            // Using a timeout to allow virtualizer to recalculate size
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
        prevCountRef.current = currentCount;
    }, [checkins.length]);

    // Calculate columns based on window width (rough estimate matching Tailwind defaults)
    const [columns, setColumns] = useState(1);
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth >= 1024) setColumns(3); // lg
            else if (window.innerWidth >= 768) setColumns(2); // md
            else setColumns(1);
        };
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const parentRef = useRef<HTMLDivElement>(null);

    // Virtualizer
    const rowCount = Math.ceil(checkins.length / columns);
    const virtualizer = useWindowVirtualizer({
        count: rowCount,
        estimateSize: () => 300, // Approximate height of a card row
        overscan: 5,
        scrollMargin: parentRef.current?.offsetTop ?? 0,
    });

    const virtualItems = virtualizer.getVirtualItems();

    return (
        <div ref={parentRef} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header ... */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Active Check-ins</h1>
                <span className="inline-flex items-center rounded-md border border-blue-500/50 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-500">
                    <Activity className="mr-1 h-3 w-3" /> Live Updates
                </span>
            </div>

            {/* Virtual Container */}
            <div
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {virtualItems.map((virtualRow) => {
                    const startIndex = virtualRow.index * columns;
                    const rowCheckins = checkins.slice(startIndex, startIndex + columns);

                    return (
                        <div
                            key={virtualRow.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
                            }}
                            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {rowCheckins.map((checkin) => {
                                // Original Card Logic
                                const healthPercent = Math.min((checkin.initial_hp / checkin.max_hp) * 100, 100);
                                let healthColor = "bg-green-500";
                                if (healthPercent < 30) healthColor = "bg-red-500";
                                else if (healthPercent < 70) healthColor = "bg-yellow-500";

                                return (
                                    <div key={checkin.id} className="rounded-xl border bg-card text-card-foreground shadow transition-colors hover:border-primary/50 group h-full">
                                        {/* Added h-full to card to fill row height */}
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
                                                <Button className="w-full" onClick={() => handleDismissClick(checkin)}>
                                                    Mark Healed
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>

            {checkins.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                    No active check-ins at the moment.
                </div>
            )}

            {activeCheckins.hasNextPage && (
                <div className="flex justify-center pt-6">
                    <Button
                        variant="ghost"
                        onClick={() => activeCheckins.fetchNextPage()}
                        disabled={activeCheckins.isFetchingNextPage}
                    >
                        {activeCheckins.isFetchingNextPage ? "Loading more..." : "Load More"}
                    </Button>
                </div>
            )}

            <PokemonDismissDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onConfirm={handleConfirmDismiss}
                checkin={selectedCheckin}
            />
        </div>
    )
}
