import { Pokemon } from '../model/pokemon';
import { Nurse } from '../model/nurse'; // Import the Nurse model
import nurseDb from '../repository/nurse.db';
import { Trainer } from '../model/trainer';


const getAllNurse = async (): Promise<Nurse[]> => nurseDb.getAllNurse();


// Function to get nurse by id
const getNurseByEmail = async (email: string): Promise<Nurse | null> => {
    // Call the database method to get nurse by id
    const nurse = await nurseDb.getNurseByEmail(email)
    return nurse;  // If the nurse exists, return it; otherwise, return null
};

const healPokemon = async (id: number): Promise<Pokemon> => {
    const heal = await nurseDb.healPokemon(id); // Ensure this heals and updates the health
    return heal
};

const addPokemonToTrainer = async (
    idPokemon: number,
): Promise<Trainer> => {
    // Call the function that processes the logic and returns a Trainer
    const trainer = await nurseDb.addPokemonToTrainer({idPokemon});
    return trainer; // Ensure the return type matches the function signature
};

const removePokemonFromNurse = async (idPokemon: number): Promise<Pokemon>=>{
    const remove = await nurseDb.removePokemonFromNurse({idPokemon});
    return remove
}


export default {
    getAllNurse,
    getNurseByEmail,
    healPokemon,
    addPokemonToTrainer,
    removePokemonFromNurse,
};
