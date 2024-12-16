import { Animal } from '../model/animal';
import { Species } from '../model/species';
import speciesDb from '../repository/species.db';

const getAllSpecies = async (): Promise<Species[]> => {
    try {
        const species = await speciesDb.getAllSpecies();

        if (!species || species.length === 0) {
            throw new Error('No species found.');
        }

        return species;
    } catch (error) {
        console.error('Error fetching species:', error);
        throw new Error('Failed to retrieve species.');
    }
};

const getAnimalsFromSpecies = async ({ id }: { id: number }) => {
    try {
        const animals = await speciesDb.getAnimalsFromSpecies({ id });
    
        if (!animals || animals.length === 0) {
            throw new Error('No animals from this species found.');
        }
        return animals
    } catch (error) {
        console.error('Error fetching animals from this species:', error);
        throw new Error('Failed to retrieve animals from this species.');
    }
};

export default {
    getAllSpecies,
    getAnimalsFromSpecies,
};
