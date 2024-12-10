import { Player } from '../model/player';
import database from './database';

const getAllPlayers = async (): Promise<Player[]> => {
    try {
        const playerPrisma = await database.player.findMany({
            include: { team: true }
        });
        return playerPrisma.map((player) => Player.from(player));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPlayerById = async (id: number): Promise<Player> => {
    try {
        const playerPrisma = await database.player.findUnique({
            where: { id },
            include: { team: true }
        });
        if (!playerPrisma) {
            throw new Error('Player not found');
        }
        return Player.from(playerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createPlayer = async (player: Player): Promise<Player> => {
    try {
        const playerPrisma = await database.player.create({
            data: {
                firstName: player.getFirstName(),
                lastName: player.getLastName(),
                email: player.getEmail(),
                phoneNumber: player.getPhoneNumber()
            }
        });
        return Player.from(playerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default { getAllPlayers, getPlayerById, createPlayer };
