import { Calendar, Search, Layers, BarChart2 } from "lucide-react";
import { useCheckinTrends } from "../hooks/useCheckinTrends";
import { usePokemonStore } from "../store/pokemonStore";
import { PokemonCheckinTrendChart } from "./PokemonCheckinTrendChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PokemonTrendSection() {
    const { filters, setFilter } = usePokemonStore();

    const { data: trendData } = useCheckinTrends({
        timeRange: filters.timeRange,
        groupBy: filters.groupBy,
        type: filters.segmentType === 'all' ? undefined : filters.segmentType,
        pokemonId: filters.filterPokemon === 'all' ? undefined : filters.filterPokemon
    });

    return (
        <PokemonCheckinTrendChart data={trendData} loading={false}>
            <div className="flex gap-2 flex-wrap mt-2">
                <Select value={filters.timeRange} onValueChange={(v) => setFilter('timeRange', v)}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                        <Calendar className="mr-2 h-3 w-3 opacity-50" />
                        <SelectValue placeholder="Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="month">This month</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filters.groupBy} onValueChange={(v) => setFilter('groupBy', v)}>
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                        <BarChart2 className="mr-2 h-3 w-3 opacity-50" />
                        <SelectValue placeholder="Group by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Group by: Day</SelectItem>
                        <SelectItem value="hour">Group by: Hour</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filters.segmentType} onValueChange={(v) => setFilter('segmentType', v)}>
                    <SelectTrigger className="w-[150px] h-8 text-xs">
                        <Layers className="mr-2 h-3 w-3 opacity-50" />
                        <SelectValue placeholder="Segment" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="grass">Grass</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filters.filterPokemon} onValueChange={(v) => setFilter('filterPokemon', v)}>
                    <SelectTrigger className="w-[150px] h-8 text-xs">
                        <Search className="mr-2 h-3 w-3 opacity-50" />
                        <SelectValue placeholder="Pokemon" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Pokemon: All</SelectItem>
                        <SelectItem value="pikachu">Pikachu</SelectItem>
                        <SelectItem value="charizard">Charizard</SelectItem>
                        <SelectItem value="bulbasaur">Bulbasaur</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </PokemonCheckinTrendChart>
    );
}
