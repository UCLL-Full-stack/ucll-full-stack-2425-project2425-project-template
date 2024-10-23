import { Game } from '../model/game';
import gameDb from '../repository/game.db';

const getAllGames = (): Game[] => {
    return gameDb.getAllGames();
};

const getGameById = (id: number): Game | undefined => {
    if (!gameDb.getGameById(id)) {
        throw new Error(`Game with id ${id} does not exist.`);
    }
    return gameDb.getGameById(id);
};

export default { getAllGames, getGameById };
