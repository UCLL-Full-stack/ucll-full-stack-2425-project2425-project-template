import { id } from 'date-fns/locale';
import { Animal } from '../model/animal';
import { Caretaker } from '../model/caretaker';
import { User } from '../model/user';
import database from './database';
import { Species } from '../model/species';
import { Expense } from '../model/expense';

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

const putNewCaretaker = async ({
    animalId,
    caretakerId,
}: {
    animalId: number;
    caretakerId: number;
}): Promise<void> => {
    try {
        await database.animal.update({
            where: { id: animalId },
            data: { caretaker: { connect: { id: caretakerId } } }, // Update the relation
        });
    } catch (error) {
        console.error('Error in putNewCaretaker:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const createAnimal = async (
    name: string,
    age: number,
    speciesId: number,
    favouriteFood: string,
    favouriteToy: string,
    caretakerId: number,
    expense: Expense,
): Promise<Animal> => {
    try {
        console.log({ name, age, speciesId, favouriteFood, favouriteToy, caretakerId });
        const animalPrisma = await database.animal.create({
            data: {
                name,
                age,
                species: { connect: { id: speciesId } },
                favouriteFood,
                favouriteToy,
                expenses: {
                    create: [{ totalCost: expense.getTotalCost(), month: expense.getMonth() }],
                },
                caretaker: { connect: { id: caretakerId } },
            },
            include: { caretaker: { include: { user: true } }, species: true, expenses: true },
        });
        return Animal.from(animalPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllAnimals,
    getAnimalsByCaretaker,
    deleteAnimal,
    putNewCaretaker,
    createAnimal,
};
