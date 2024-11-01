
export type User ={
    firstName: string;
    lastName: string;
    email: string;
}

export type PokemonStats ={
    hp: number;
    attack: number;
    defence: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
}

export type Pokemon = {
    id?: number;
    name: string;
    type: string;
    stats: PokemonStats;
    health: number;
    canEvolve: boolean;
}


export type Trainer = {
    id?: number;
    user: User;
    pokemon: Pokemon[];
}

export type Badge = {
    name: string;
    location: string;
    difficulty: number;
}

export type GymBattle = {
    id?: number;
    date: Date;
    time: Date;
    badge: Badge;
}
