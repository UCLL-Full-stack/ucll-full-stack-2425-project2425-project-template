import { Part } from "../model/part";
import database from './database';

const getAllParts = async (): Promise<Part[]> => {
    try {
        const partPrisma = await database.part.findMany();
        return partPrisma.length > 0 ? partPrisma.map(Part.from) : [];
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPartById = async ({ id }: { id: number }): Promise<Part | null> => {
    try {
        const partPrisma = await database.part.findUnique({
            where: { id },
        });

        return partPrisma ? Part.from(partPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPartByName = async ({ name } : { name: string }): Promise<Part | null> => {
    try {
        const partPrisma = await database.part.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive', // case insensitive
                }
            },
        });
        return partPrisma ? Part.from(partPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllParts,
    getPartById,
    getPartByName,
}