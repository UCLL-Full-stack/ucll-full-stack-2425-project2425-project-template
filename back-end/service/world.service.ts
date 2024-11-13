import { World } from '../model/world';
import worldDb from '../repository/world.db';

const getAllWorlds = (): Promise<World[]> => {
    return worldDb.getAllWorlds();
};

const getWorldById = (id: number): Promise<World> => {
    return worldDb.getWorldById(id);
};

export default {
    getAllWorlds,
    getWorldById,
};
