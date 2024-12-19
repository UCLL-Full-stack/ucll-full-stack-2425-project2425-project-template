 export type Role = 'admin' | 'trainer' | 'nurse' | 'guest';


export type User ={
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    password:string
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

export type Nurse = {
    id?: number;
    user: User;
    pokemon: Pokemon[];
}

export type Trainer = {
    id?: number;
    user: User;
    pokemon: Pokemon[];
    badges: Badge[];
}

export type Badge = {
    id: number;
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
