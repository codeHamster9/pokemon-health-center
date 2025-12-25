import { Suspense } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { PokemonStatsGrid } from "@/features/pokemon/components/PokemonStatsGrid";
import { PokemonStatsGridSkeleton } from "@/features/pokemon/components/PokemonStatsGridSkeleton";
import { PokemonTrendSection } from "@/features/pokemon/components/PokemonTrendSection";
import { PokemonChartSkeleton } from "@/features/pokemon/components/PokemonChartSkeleton";
import { PokemonLeaderboardSection } from "@/features/pokemon/components/PokemonLeaderboardSection";
import { PokemonLeaderboardSkeleton } from "@/features/pokemon/components/PokemonLeaderboardSkeleton";

export default function Dashboard() {
    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(new Date(), "MMM d, yyyy")}
                    </Button>
                </div>
            </div>

            <Suspense fallback={<PokemonStatsGridSkeleton />}>
                <PokemonStatsGrid />
            </Suspense>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Suspense fallback={<PokemonChartSkeleton />}>
                    <PokemonTrendSection />
                </Suspense>
                <Suspense fallback={<PokemonLeaderboardSkeleton />}>
                    <PokemonLeaderboardSection />
                </Suspense>
            </div>
        </div>
    )
}
