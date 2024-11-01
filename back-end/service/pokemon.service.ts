// services/PokemonService.ts
import { Pokemon } from '../model/pokemon';
import { Trainer } from '../model/trainer'; // Adjust the import path as necessary
import trainers from '../repository/trainer.db'; // Assuming you have your trainers data in this path

class PokemonService {
    // Method to get all pokemons by trainer ID
    getAllPokemonsByTrainerId(trainerId: number): Pokemon[] | null {
        // Find the trainer by ID
        const trainer: Trainer | null = trainers.getTrainerById({ id: trainerId });

        if (!trainer) {
            console.error(`Trainer with ID ${trainerId} not found.`);
            return null; // Return null if trainer not found
        }

        // Return the Pokémon associated with the trainer
        return trainer.getPokemon();
    }
}

export default new PokemonService();
