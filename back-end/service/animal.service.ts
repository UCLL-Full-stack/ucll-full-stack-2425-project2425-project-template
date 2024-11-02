import { Animal } from "../model/animal";
import animalDb from "../repository/animal.db";

const getAllAnimals = async (): Promise<Animal[]> => {
    try {
        const animals = await animalDb.getAllAnimals();

        
        if (!animals || animals.length === 0) {
            throw new Error("No animals found.");
        }

        return animals;
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw new Error("Failed to retrieve animals.");
    }
};

export default {
    getAllAnimals
};