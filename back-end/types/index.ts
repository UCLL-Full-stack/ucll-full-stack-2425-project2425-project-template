type Role = 'admin' | 'trainer' | 'nurse' | 'guest';

type PokemonInput = {
  id?: number;
  name: string;
  type: string;
  stats: {hp:number,attack:number,defence:number,specialAttack:number,specialDefence:number,speed:number}
  health: number;
  canEvolve: boolean;
};

export interface User {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface Pokemon {
    id?: number;
    name: string;
    type: string;
    stats: {
      hp: number;
      attack: number;
      defence: number;
      specialAttack: number;
      specialDefence: number;
      speed: number;
    };
    health: number;
    canEvolve: boolean;
  }
  
  export interface Trainer {
    id?: number;
    user: User;
    pokemon: Pokemon[];
  }
  

export {
    Role,
    PokemonInput,
};