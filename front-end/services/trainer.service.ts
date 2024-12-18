
import { Pokemon, Trainer, User } from '@types';

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



  getTrainerByEmail: async (email: string): Promise<Trainer> => {
    const user = localStorage.getItem('loggedInUser');
    let token = null
    if (user) {
      token =JSON.parse(user).token;
    }
    const response = await fetch(`${API_URL}/trainers/email?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    });
    
    if (!response.ok) {
      const errorText = await response.text();  // Read response as text if error
      console.error('Error response:', errorText);
      throw new Error('Failed to fetch trainer data');
    }
    
    const data = await response.json();  // Parse the JSON if the response is OK
    return data as Trainer;
  },

  addPokemonToTrainerById: async(id:number,pokemon:Pokemon): Promise<Trainer> => {
    const user = localStorage.getItem('loggedInUser');
    let token = null
    if (user) {
      token =JSON.parse(user).token;
    }
    const response = await fetch(`${API_URL}/trainers/${id}`,{
      method: "POST",
      headers: {"content-type" : 'application/json',
        Authorization: `Bearer ${token}`,
      },
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


// alert hoeven hiert niet moet enkel de simple dingen zijn 