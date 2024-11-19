import { Game } from '../model/game';
import database from './database';

const getAllGames = async (): Promise<Game[]> => {
    try {
        const gamePrisma = await database.game.findMany({
            include: { teams: { include: { team: true } } }
        });
        return gamePrisma.map((gamePrisma) => Game.from({
            ...gamePrisma,
            teams: gamePrisma.teams.map(teamRelation => ({
                id: teamRelation.team.id,
                teamName: teamRelation.team.teamName,
                coachId: teamRelation.team.coachId
            }))
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getGameById = async (id: number): Promise<Game> => {
    try {
        const gamePrisma = await database.game.findUnique({
            where: { id },
            include: { teams: { include: { team: true } } }
        });
        if (!gamePrisma) {
            throw new Error('Game not found');
        }
        return Game.from({ 
            ...gamePrisma, 
            teams: gamePrisma.teams.map(teamRelation => ({
                id: teamRelation.team.id,
                teamName: teamRelation.team.teamName,
                coachId: teamRelation.team.coachId
            }))
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createGame = async (game: Game): Promise<Game> => {
    try {
        await database.game.create({
            data: {
                date: game.getDate(),
                result: game.getResult() ?? '',
            }
        });
        return game;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default { getAllGames, getGameById, createGame };
