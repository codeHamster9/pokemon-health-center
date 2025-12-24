import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface LeaderboardItem {
    name: string;
    count: number;
    color?: string; // Optional hex color/class
}

interface PokemonLeaderboardTableProps {
    title: string;
    description: string;
    data: LeaderboardItem[];
}

export function PokemonLeaderboardTable({ title, description, data }: PokemonLeaderboardTableProps) {
    const maxCount = Math.max(...data.map(d => d.count), 1);

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div className="flex items-center" key={item.name}>
                            <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 border">
                                {index + 1}
                            </span>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-sm text-muted-foreground">{item.count}</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-300"
                                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
