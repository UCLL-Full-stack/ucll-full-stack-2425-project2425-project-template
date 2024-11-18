import { Game } from '../model/game';

const getAllGames = (): Game[] => {
    return games;
};

const getGameById = (id: number): Game | undefined => {
    try {
        return games.find((game) => game.getId() === id) || undefined;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createGame = (game: Game): Game => {
    games.push(game);
    return game;
};

export default { getAllGames, getGameById, createGame };
