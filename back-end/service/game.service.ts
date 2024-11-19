import { Game } from '../model/game';
import gameDb from '../repository/game.db';
import { GameInput } from '../types';

const getAllGames = async (): Promise<Game[]> => {
    return await gameDb.getAllGames();
};

const getGameById = async (id: number): Promise<Game> => {
    const game = await gameDb.getGameById(id);
    if (!game) {
        throw new Error(`Game with id ${id} does not exist.`);
    }
    return game;
};

const createGame = async (gameInput: GameInput): Promise<Game> => {
    const existingGames = await gameDb.getAllGames();

    if (!(gameInput.date instanceof Date) || isNaN(gameInput.date.getTime())) {
        throw new Error('Date is required.');
    }
    if (existingGames.find((game) => game.getId() === gameInput.id)) {
        throw new Error(`Game with id ${gameInput.id} already exists.`);
    }
    if (!gameInput.teams || gameInput.teams.length !== 2) {
        throw new Error('Exactly two teams are required.');
    }

    const newGame = new Game(gameInput);
    return await gameDb.createGame(newGame);
};

export default { getAllGames, getGameById, createGame };
