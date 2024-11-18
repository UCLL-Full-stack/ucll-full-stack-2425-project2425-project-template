import { Player } from '../model/player';
import database from './database';

const getAllPlayers = (): Player[] => {
    return players;
};

const getPlayerById = (id: number): Player | undefined => {
    try {
        return players.find((player) => player.getId() === id) || undefined;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createPlayer = (player: Player): Player => {
    players.push(player);
    return player;
};

export default { getAllPlayers, getPlayerById, createPlayer };
