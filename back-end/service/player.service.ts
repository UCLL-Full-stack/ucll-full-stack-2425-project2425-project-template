import { Player } from '../model/player';
import playerDb from '../repository/player.db';

const getAllPlayers = (): Promise<Player[]> => {
    return playerDb.getAllPlayers();
};

const getPlayerById = (id: number): Promise<Player> => {
    return playerDb.getPlayerById(id);
};

export default {
    getAllPlayers,
    getPlayerById,
};
