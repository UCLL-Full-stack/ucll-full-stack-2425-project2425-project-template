import libraryDB from '../repository/library.db';
import { Game } from '../model/game';

const getAllLibraryGames = (): Game[] => libraryDB.getAllLibraryGames();

export default {
    getAllLibraryGames
};
