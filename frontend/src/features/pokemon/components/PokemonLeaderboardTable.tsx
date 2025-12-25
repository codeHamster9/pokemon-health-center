import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";

interface LeaderboardItem {
    name: string;
    count: number;
    type?: string;
}

interface PokemonLeaderboardTableProps {
    topPokemon: LeaderboardItem[];
    topTypes: LeaderboardItem[];
}

export function PokemonLeaderboardTable({ topPokemon, topTypes }: PokemonLeaderboardTableProps) {
    const [category, setCategory] = useState<'pokemon' | 'types'>('pokemon');

    const data = category === 'pokemon' ? topPokemon : topTypes;
    const maxCount = Math.max(...data.map(d => d.count), 1);

    const getRankStyles = (index: number) => {
        if (index === 0) { // Rank 1
            return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
        }
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    };

    const getBarColor = (index: number) => {
        // Since we don't have type data for coloring bars perfectly like mockup, 
        // we'll use a nice palette or default to primary.
        // Mockup uses: Yellow, Orange, Green. 
        const colors = [
            "bg-yellow-400", // 1
            "bg-orange-500", // 2
            "bg-green-500",  // 3
            "bg-blue-500",   // 4
            "bg-purple-500"  // 5
        ];
        return colors[index % colors.length];
    };

    return (
        <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-medium leading-6">
                        {category === 'pokemon' ? 'Top Pokémon' : 'Top Types'}
                    </CardTitle>
                    <CardDescription>
                        Most frequent {category === 'pokemon' ? 'visitors' : 'types'}
                    </CardDescription>
                </div>
                <Select
                    value={category}
                    onValueChange={(v) => setCategory(v as 'pokemon' | 'types')}
                >
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pokemon">Top Pokémon</SelectItem>
                        <SelectItem value="types">Top Types</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 pt-4">
                    {data.map((item, index) => (
                        <div className="flex items-center" key={item.name}>
                            <span className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 border",
                                getRankStyles(index)
                            )}>
                                {index + 1}
                            </span>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium capitalize">{item.name}</span>
                                    <span className="text-sm text-muted-foreground">{item.count}</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full transition-all duration-500", getBarColor(index))}
                                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {data.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-4">
                            No data available
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
