import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface PokemonCheckinTrendChartProps {
    data: any[];
    loading?: boolean;
    children?: React.ReactNode; // For filters
}

export function PokemonCheckinTrendChart({ data, loading, children }: PokemonCheckinTrendChartProps) {

    if (loading) {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Check-ins Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] flex items-center justify-center">
                    <div className="animate-pulse text-muted-foreground">Loading chart...</div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="col-span-4">
            <CardHeader>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <CardTitle>Check-ins Trend</CardTitle>
                        <CardDescription>
                            Daily healing activity over time
                        </CardDescription>
                    </div>
                </div>
                {children}
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="label" // Matches backend MetricPoint.label
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))' }}
                        />
                        <Bar
                            dataKey="count" // Assumes backend returns 'count'
                            fill="currentColor"
                            radius={[4, 4, 0, 0]}
                            className="fill-primary"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
