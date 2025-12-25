import { Activity, Calendar, Users, Zap, Search, Layers, BarChart2 } from "lucide-react"
import { useCheckinTrends } from "../../features/pokemon/hooks/useCheckinTrends";
import { useMachineMetrics } from "../../features/pokemon/hooks/useMachineMetrics";
import { useLeaderboards } from "../../features/pokemon/hooks/useLeaderboards";
import { usePokemonStore } from "../../features/pokemon/store/pokemonStore";
import { PokemonStatCard } from "../../features/pokemon/components/PokemonStatCard";
import { PokemonCheckinTrendChart } from "../../features/pokemon/components/PokemonCheckinTrendChart";
import { PokemonLeaderboardTable } from "../../features/pokemon/components/PokemonLeaderboardTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Machine } from "../../features/pokemon/api/pokemonApi";

export default function Dashboard() {
    const { filters, setFilter } = usePokemonStore();

    const checkinTrends = useCheckinTrends({
        timeRange: filters.timeRange,
        groupBy: filters.groupBy,
        type: filters.segmentType === 'all' ? undefined : filters.segmentType,
        pokemonId: filters.filterPokemon === 'all' ? undefined : filters.filterPokemon
    });

    const { data: leaderboards } = useLeaderboards();
    const { data: machines = [] } = useMachineMetrics();

    const totalCheckins = machines.reduce((acc, m) => acc + (m.total_checkins || 0), 0);
    const avgSuccessRate = machines.length > 0
        ? (machines.reduce((acc, m) => acc + (m.success_rate || 0), 0) / machines.length).toFixed(1)
        : "0.0";
    const activeCount = machines.filter(m => m.current_checkin).length;

    const topMachine = machines.reduce((prev, current) => {
        return (prev.success_rate || 0) > (current.success_rate || 0) ? prev : current
    }, { name: 'N/A', success_rate: 0 } as Partial<Machine>);

    const topMachineName = topMachine.name || 'N/A'; // Ensure string
    const topMachineRate = topMachine.success_rate || 0;


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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <PokemonStatCard
                    title="Total Check-ins"
                    value={totalCheckins.toLocaleString()}
                    icon={Users}
                    description={<span className="text-green-500 font-medium">+12% from last week</span>} // Hardcoded delta for now
                />
                <PokemonStatCard
                    title="Success Rate"
                    value={`${avgSuccessRate}%`}
                    icon={Activity}
                    description={<span className="text-green-500 font-medium">+2.1% from yesterday</span>}
                />
                <PokemonStatCard
                    title="Active Now"
                    value={activeCount}
                    icon={Zap} // Pulse icon replacement
                    description={<span className="text-blue-500 font-medium animate-pulse">● Currently treating</span>}
                />
                <PokemonStatCard
                    title="Top Machine"
                    value={topMachineName}
                    icon={Zap}
                    description={`${topMachineRate}% success rate`}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <PokemonCheckinTrendChart data={checkinTrends.data || []} loading={checkinTrends.isLoading}>
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

                <PokemonLeaderboardTable
                    topPokemon={leaderboards?.top_pokemon || []}
                    topTypes={leaderboards?.top_types || []}
                />
            </div>
        </div>
    )
}
