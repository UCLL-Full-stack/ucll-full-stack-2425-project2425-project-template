import { Player } from '../model/player';
import database from './database';

/* 

FUNCTIONALITY

*/

const getAllPlayers = async (): Promise<Player[]> => {
    try {
        const result = await database.player.findMany({
            include: { user: true },
        });
        return result.map((playerprisma) => Player.from(playerprisma));
    } catch (error) {
        console.error(error);
        throw new Error('oops');
    }
};

const getPlayerById = async (id: number): Promise<Player> => {
    try {
        const result = await database.player.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: { user: true },
        });
        return Player.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('Player not found');
    }
};

export default {
    getAllPlayers,
    getPlayerById,
};
