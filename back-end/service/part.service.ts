import partDB from '../repository/part.db';
import { Part } from '../model/part';

const getAllParts = async (): Promise<Part[]> => {
    return await partDB.getAllParts();
};

const getPartById = async (id: number): Promise<Part> => {
    const part = await partDB.getPartById({ id });
    if (!part) throw new Error(`Part with id ${id} not found`);
    return part;
};

const getPartByName = async (name: string): Promise<Part> => {
    const part = await partDB.getPartByName({ name });
    if (!part) throw new Error(`Part with name ${name} not found`);
    return part;
};

export default {
    getAllParts,
    getPartById,
    getPartByName,
};
