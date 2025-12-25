import { useLeaderboards } from "../hooks/useLeaderboards";
import { PokemonLeaderboardTable } from "./PokemonLeaderboardTable";

export function PokemonLeaderboardSection() {
    const { data: leaderboards } = useLeaderboards();

    return (
        <PokemonLeaderboardTable
            topPokemon={leaderboards?.top_pokemon || []}
            topTypes={leaderboards?.top_types || []}
        />
    );
}
