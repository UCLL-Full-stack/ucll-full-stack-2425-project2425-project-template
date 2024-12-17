import { Animal } from '../model/animal';
import { Caretaker } from '../model/caretaker';
import { User } from '../model/user';
import database from './database';

const getAllAnimals = async (): Promise<Animal[]> => {
    try {
        const animalPrisma = await database.animal.findMany({
            include: {
                caretaker: { include: { user: true } },
                species: true,
                expenses: true,
            },
        });
        return animalPrisma.map((animalPrisma) => Animal.from(animalPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAnimalsByCaretaker = async ({ username }: { username: string }): Promise<Animal[]> => {
    try {
        const animalPrisma = await database.animal.findMany({
            where: { caretaker: { user: { username } } },
            include: {
                caretaker: { include: { user: true } },
                species: true,
                expenses: true,
            },
        });

        return animalPrisma.map((animalPrisma) => Animal.from(animalPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteAnimal = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.animal.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllAnimals, getAnimalsByCaretaker, deleteAnimal };
