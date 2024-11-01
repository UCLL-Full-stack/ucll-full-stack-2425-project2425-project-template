
export interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defence: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
}

export interface Pokemon {
    id?: number;
    name: string;
    type: string;
    stats: PokemonStats;
    health: number;
    canEvolve: boolean;
}

export interface Trainer {
    id?: number;
    user: User;
    pokemon: Pokemon[];
}

export interface Badge {
    name: string;
    location: string;
    difficulty: number;
}

export interface GymBattle {
    id?: number;
    date: Date;
    time: Date;
    badge: Badge;
}
