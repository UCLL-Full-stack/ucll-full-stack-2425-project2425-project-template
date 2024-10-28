import { Game } from '../model/game';
import gameDb from '../repository/game.db';
import { GameInput } from '../types';

const getAllGames = (): Game[] => {
    return gameDb.getAllGames();
};

const getGameById = (id: number): Game | undefined => {
    if (!gameDb.getGameById(id)) {
        throw new Error(`Game with id ${id} does not exist.`);
    }
    return gameDb.getGameById(id);
};

const createGame = (gameInput: GameInput): Game => {
    const existingGames = gameDb.getAllGames() || [];

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
    gameDb.createGame(newGame);
    return newGame;
};

export default { getAllGames, getGameById, createGame };
