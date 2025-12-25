import { usePokemonLeaderboards } from "../hooks/usePokemonLeaderboards";
import { PokemonLeaderboardTable } from "./PokemonLeaderboardTable";

export function PokemonLeaderboardSection() {
    const { data: leaderboards } = usePokemonLeaderboards();

    return (
        <PokemonLeaderboardTable
            topPokemon={leaderboards?.top_pokemon || []}
            topTypes={leaderboards?.top_types || []}
        />
    );
}
