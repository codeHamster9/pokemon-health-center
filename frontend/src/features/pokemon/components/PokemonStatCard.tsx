import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface PokemonStatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: React.ReactNode;
    className?: string; // Add className prop for flexibility
}

export function PokemonStatCard({ title, value, icon: Icon, description, className }: PokemonStatCardProps) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
