import { z } from 'zod';

const API_BASE_URL = 'http://localhost:8000';

export interface Pokemon {
    id: number;
    name: string;
    type_primary: string;
    type_secondary: string | null;
}

export interface Checkin {
    id: number;
    pokemon_id: number;
    machine_id: number;
    arrived_at: string;
    healed_at: string | null;
    initial_hp: number;
    max_hp: number;
    outcome: string;
    pokemon?: Pokemon;
    machine?: Machine;
}

export interface Machine {
    id: number;
    name: string;
    model: string;
    location: string;
    total_checkins?: number;
    success_rate?: number;
    current_checkin?: Checkin | null;
}

export const checkinSchema = z.object({
    id: z.number(),
    pokemon_id: z.number(),
    machine_id: z.number(),
    arrived_at: z.string(),
    healed_at: z.string().nullable(),
    initial_hp: z.number(),
    max_hp: z.number(),
    outcome: z.string(),
});

export const pokemonApi = {
    getActiveCheckins: async (): Promise<Checkin[]> => {
        const response = await fetch(`${API_BASE_URL}/checkins/active`);
        if (!response.ok) throw new Error('Failed to fetch active check-ins');
        return response.json();
    },

    dismissCheckin: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/checkins/dismiss/${id}`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to dismiss check-in');
    },

    getCheckinTrends: async (
        timeRange: string,
        groupBy: string,
        type?: string,
        pokemonId?: string
    ): Promise<any[]> => { // Type this properly based on backend response
        const params = new URLSearchParams({
            time_range: timeRange,
            group_by: groupBy,
        });
        if (type && type !== 'all') params.append('type', type);
        if (pokemonId && pokemonId !== 'all') params.append('pokemon_id', pokemonId);

        const response = await fetch(`${API_BASE_URL}/metrics/checkins?${params}`);
        if (!response.ok) throw new Error('Failed to fetch check-in trends');
        return response.json();
    },

    getMachineMetrics: async (baselineId?: number): Promise<Machine[]> => {
        const url = baselineId
            ? `${API_BASE_URL}/metrics/machines/compare?baseline_id=${baselineId}`
            : `${API_BASE_URL}/metrics/machines`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch machine metrics');
        return response.json();
    },

    getLeaderboards: async (): Promise<{ top_pokemon: any[]; top_types: any[] }> => {
        const response = await fetch(`${API_BASE_URL}/leaderboards`);
        if (!response.ok) throw new Error('Failed to fetch leaderboards');
        return response.json();
    }
};
