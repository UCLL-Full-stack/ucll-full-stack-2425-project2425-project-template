import { Game } from '../model/game';
import database from './database';

const getAllGames = async (): Promise<Game[]> => {
    try {
        const gamePrisma = await database.game.findMany({
            include: { teams: true }
        });
        return gamePrisma.map((gamePrisma) => Game.from(gamePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getGameById = async (id: number): Promise<Game> => {
    try {
        const gamePrisma = await database.game.findUnique({
            where: { id },
            include: { teams: true }
        });
        if (!gamePrisma) {
            throw new Error('Game not found');
        }
        return Game.from({ ...gamePrisma, teams: gamePrisma.teams });
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createGame = async (game: Game): Promise<Game> => {
    try {
        
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default { getAllGames, getGameById, createGame };
