import { Suspense } from "react";
import { Activity } from "lucide-react";
import { PokemonActiveCheckinsList } from "@/features/pokemon/components/PokemonActiveCheckinsList";
import { PokemonCheckinsListSkeleton } from "@/features/pokemon/components/PokemonCheckinsListSkeleton";

export default function ActiveCheckins() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Active Check-ins</h1>
                <span className="inline-flex items-center rounded-md border border-blue-500/50 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-500">
                    <Activity className="mr-1 h-3 w-3" /> Live Updates
                </span>
            </div>

            <Suspense fallback={<PokemonCheckinsListSkeleton />}>
                <PokemonActiveCheckinsList />
            </Suspense>
        </div>
    )
}
