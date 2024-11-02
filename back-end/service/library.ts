import libraryDB from '../repository/library.db';
import { Game } from '../model/game';

const getAllLibraryGames = (): Game[] => libraryDB.getAllLibraryGames();

const addGameToLibrary = (game: Game): Game => {
    if (getAllLibraryGames().some(ownedGame => ownedGame.id === game.id)) {
        throw new Error("Game is already owned.")
    }

    libraryDB.addGameToLibrary(game);
    return game;
}

export default {
    getAllLibraryGames,
    addGameToLibrary,
};
