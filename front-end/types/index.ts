// types/index.ts

// Interface representing a user with basic personal information
export interface User {
    firstName: string; // User's first name
    lastName: string;  // User's last name
    email: string;     // User's email address
}

// Interface representing the statistics of a Pokémon
export interface PokemonStats {
    hp: number;               // Hit Points
    attack: number;           // Attack stat
    defence: number;          // Defence stat
    specialAttack: number;    // Special Attack stat
    specialDefence: number;   // Special Defence stat
    speed: number;            // Speed stat
}

// Interface representing a Pokémon with its properties
export interface Pokemon {
    id?: number;              // Optional Pokémon ID
    name: string;             // Pokémon name
    type: string;             // Pokémon type (e.g., "fire", "water", etc.)
    stats: PokemonStats;      // Pokémon's statistics
    health: number;           // Current health points
    canEvolve: boolean;       // Whether the Pokémon can evolve
}

// Interface representing a trainer with user information and their Pokémon
export interface Trainer {
    id?: number;              // Optional Trainer ID
    user: User;               // User information related to the trainer
    pokemon: Pokemon[];       // List of Pokémon owned by the trainer
}

// (Optional) Interface representing a badge for trainers
export interface Badge {
    name: string;             // Name of the badge
    location: string;         // Location where the badge can be obtained
    difficulty: number;       // Difficulty level of obtaining the badge
}

// (Optional) Interface representing a gym battle for trainers
export interface GymBattle {
    id?: number;              // Optional Gym Battle ID
    date: Date;               // Date of the battle
    time: Date;               // Time of the battle
    badge: Badge;             // Badge associated with the battle
}
