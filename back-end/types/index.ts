// --- Role Definition ---
type Role = "admin" | "trainer" | "nurse" ;


// --- PokemonStats Type ---
type PokemonStats = {
  hp: number;
  attack: number;
  defence: number;
  specialAttack: number;
  specialDefence: number;
  speed: number;
};

// --- User Type ---
type Userinput = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
};

// --- Badge Type ---
type Badge = {
  id?: number;
  name: string;
  location: string;
  difficulty: number;
};

// --- GymBattle Type ---
type GymBattle = {
  id?: number;
  date: Date;
  time: Date;
  badge: Badge;
};

// --- Pokemon Type ---
type PokemonInput = {
  id?: number;
  name: string;
  type: string;
  stats: PokemonStats;
  health: number;
  canEvolve: boolean;
};

type BadgeInput = {
  id?: number;
  name: string;
  location: string;
  difficulty: number;
};

// --- Trainer Type ---
type Trainer = {
  id?: number;
  user: Userinput;
  pokemon: PokemonInput[];
  badges: Badge[];
  gymBattles: GymBattle[];
};

// --- AuthenticationResponse Type ---
type AuthenticationResponse = {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};


// --- Shared Exports ---
export {
  Role,
  PokemonStats,
  Userinput,
  Badge,
  GymBattle,
  PokemonInput,
  BadgeInput,
  Trainer,
  AuthenticationResponse,
};
