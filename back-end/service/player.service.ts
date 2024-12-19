import { Player } from '../model/player';
import playerDb from '../repository/player.db';

const getAllPlayers = (): Promise<Player[]> => {
    return playerDb.getAllPlayers();
};

const getPlayerById = (id: number): Promise<Player> => {
    return playerDb.getPlayerById(id);
};

const getPlayersByUser = async (email: string): Promise<Player[]> => {
    let players = await playerDb.getAllPlayers();
    const res = players.filter((player) => {
        return player.getUser().getEmail() === email;
    })
    return res;
};

export default {
    getAllPlayers,
    getPlayerById,
    getPlayersByUser,
};
