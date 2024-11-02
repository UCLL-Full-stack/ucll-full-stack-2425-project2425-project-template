// services/TrainerService.ts
import { Pokemon, Trainer } from '@types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TrainerService = {
  getAllTrainers: async (): Promise<Trainer[]> => {
    const response = await fetch(`${API_URL}/trainers`);
    if (!response.ok) {
      throw new Error('Failed to fetch trainers.');
    }
    const data = await response.json();
    return data as Trainer[]; 
  },

  addPokemonToTrainerById: async(id:number,pokemon:Pokemon): Promise<Trainer> => {
    const response = await fetch(`${API_URL}/trainers/${id}`,{
      method: "POST",
      headers: {"content-type" : 'application/json'},
      body: JSON.stringify(pokemon)
    });
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "validation error.")
      throw new Error('Failed to add pokemon to trainer.')
    }
    const trainer = await response.json();
    return trainer as Trainer;
  }
};

export default TrainerService;
