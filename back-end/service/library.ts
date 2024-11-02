import libraryDB from '../repository/library.db';
import { Game } from '../model/game';
import { Library } from '../model/library';

const getLibraryById = (id: number): Library => {
    if (libraryDB.getLibraryById(id) === null) {
        throw new Error(`Library not found with id ${id}`);
    }
    return libraryDB.getLibraryById(id)!;
}

const getAllLibraryGames = (id: number): Game[] => {
    return libraryDB.getAllLibraryGames(libraryDB.getLibraryById(id)!);
}

const addGameToLibrary = (id: number, game: Game): Game => {
    if (getAllLibraryGames(id).some(ownedGame => ownedGame.id === game.id)) {
        throw new Error("Game is already owned.")
    }

    libraryDB.addGameToLibrary(libraryDB.getLibraryById(id)!, game);
    return game;
}

export default {
    getAllLibraryGames,
    addGameToLibrary,
};
