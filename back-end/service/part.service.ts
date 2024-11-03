import partDB from '../repository/part.db';
import { Part } from '../model/part';

const getAllParts = (): Part[] => partDB.getAllParts();

const getPartById = (id: number): Part => {
    const part = partDB.getPartById({ id });
    if (!part) throw new Error(`Part with id ${id} does not exist`);
    return part;
};

export default { getAllParts, getPartById };
