import { Player } from '../model/player';
import playerDb from '../repository/player.db';

const getAllPlayers = (): Player[] => {
    return playerDb.getAllPlayers();
};

const getPlayerById = (id: number): Player | undefined => {
    if (!playerDb.getPlayerById(id)) {
        throw new Error(`Player with id ${id} does not exist.`);
    }
    return playerDb.getPlayerById(id);
};

export default { getAllPlayers, getPlayerById };
