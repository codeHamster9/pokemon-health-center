import { useRef, useState } from "react";
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { usePokemonCheckins } from "../hooks/usePokemonCheckins";
import { useResponsiveColumns } from "@/hooks/useResponsiveColumns";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { CheckinCard } from "./CheckinCard";
import { PokemonDismissDialog } from "./PokemonDismissDialog";
import { Checkin } from "../api/pokemonApi";
import { Button } from "@/components/ui/button";

export function PokemonActiveCheckinsList() {
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

    // Flatten pages
    const checkins = activeCheckins.data?.pages.flatMap((page) => page) || [];

    // Auto-scroll logic
    useAutoScroll(checkins.length);

    // Grid columns logic
    const columns = useResponsiveColumns();

    const parentRef = useRef<HTMLDivElement>(null);

    // Virtualizer
    const rowCount = Math.ceil(checkins.length / columns);
    const virtualizer = useWindowVirtualizer({
        count: rowCount,
        estimateSize: () => 300,
        overscan: 5,
        scrollMargin: parentRef.current?.offsetTop ?? 0,
    });

    const virtualItems = virtualizer.getVirtualItems();

    return (
        <>
            {/* Virtual Container */}
            <div
                ref={parentRef}
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
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
                            }}
                            className="grid gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {rowCheckins.map((checkin) => (
                                <CheckinCard
                                    key={checkin.id}
                                    checkin={checkin}
                                    onDismiss={handleDismissClick}
                                />
                            ))}
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
        </>
    );
}
