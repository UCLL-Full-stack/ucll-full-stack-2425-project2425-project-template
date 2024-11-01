const BASE_URL = 'http://localhost:3000';

const getAllLibraryGames = async () => {
    return fetch(`${BASE_URL}/library`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const LibraryService = {
    getAllLibraryGames,
};

export default LibraryService;
