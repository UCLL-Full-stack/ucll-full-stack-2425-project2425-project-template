// --- Role Definition ---
type Role = "admin" | "trainer" | "nurse" | "guest";


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
type User = {
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

// --- Trainer Type ---
type Trainer = {
  id?: number;
  user: User;
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
  User,
  Badge,
  GymBattle,
  PokemonInput,
  Trainer,
  AuthenticationResponse,
};
