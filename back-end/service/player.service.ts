import { Player } from '../model/player';
import playerDb from '../repository/player.db';

const getAllPlayers = (): Player[] => {
    return playerDb.getAllPlayers();
};

const getPlayerById = (id: number): Player => {
    return playerDb.getPlayerById(id);
};

export default {
    getAllPlayers,
    getPlayerById,
};
