import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PokemonLeaderboardSkeleton() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle><Skeleton className="h-5 w-24" /></CardTitle>
                    <Skeleton className="h-8 w-[120px]" />
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 flex-1" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
