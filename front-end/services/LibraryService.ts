import { Game } from '@types';

const BASE_URL = 'http://localhost:3000';

const getAllLibraryGames = async () => {
    return fetch(`${BASE_URL}/library`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const addGameToLibrary = async (game: Game) => {
    return fetch(`${BASE_URL}/library/addGame`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game)
    })
}

const LibraryService = {
    getAllLibraryGames,
    addGameToLibrary,
};

export default LibraryService;
