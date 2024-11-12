import { World } from '../model/world';
import worldDb from '../repository/world.db';

const getAllWorlds = (): World[] => {
    return worldDb.getAllPlayers();
};

const getWorldById = (id: number): World => {
    return worldDb.getPlayerById(id);
};

export default {
    getAllWorlds,
    getWorldById,
};
