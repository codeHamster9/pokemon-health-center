import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PokemonChartSkeleton() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle><Skeleton className="h-5 w-32" /></CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full rounded-md" />
                <div className="flex gap-2 flex-wrap mt-4">
                    <Skeleton className="h-8 w-[140px]" />
                    <Skeleton className="h-8 w-[130px]" />
                    <Skeleton className="h-8 w-[150px]" />
                    <Skeleton className="h-8 w-[150px]" />
                </div>
            </CardContent>
        </Card>
    );
}
