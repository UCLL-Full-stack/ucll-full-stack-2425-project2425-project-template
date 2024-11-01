// services/TrainerService.ts
import { Trainer } from '@types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TrainerService = {
  getAllTrainers: async (): Promise<Trainer[]> => {
    const response = await fetch(`${API_URL}/trainers`);
    if (!response.ok) {
      throw new Error('Failed to fetch trainers');
    }
    const data = await response.json();
    return data as Trainer[]; 
  },
};

export default TrainerService;
