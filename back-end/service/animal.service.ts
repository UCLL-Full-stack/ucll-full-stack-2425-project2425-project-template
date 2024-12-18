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

const getAnimalsByCaretaker = async ({ username }: { username: string }) => {
    try {
        const animals = await animalDb.getAnimalsByCaretaker({ username });
    
        if (!animals || animals.length === 0) {
            throw new Error('No animals for this caretaker found.');
        }
        return animals
    } catch (error) {
        console.error('Error fetching animals from this caretaker:', error);
        throw new Error('Failed to retrieve animals from this caretaker.');
    }
};

const deleteAnimal = async ({ id }: { id: number}) => {
    try {
        return await animalDb.deleteAnimal({ id });
    } catch (error) {
        console.error('Error deleting animal:', error);
        throw new Error('Failed to delete animal.');
    }
}

const putNewCaretaker = async ({ animalId, caretakerId }: { animalId: number, caretakerId: number }) => {
    try {
        return await animalDb.putNewCaretaker({ animalId, caretakerId });
    } catch (error) {
        console.error('Error updating caretaker:', error);
        throw new Error('Failed to update caretaker.');
    }
};

export default {
    getAllAnimals,
    getAnimalsByCaretaker,
    deleteAnimal,
    putNewCaretaker,
};