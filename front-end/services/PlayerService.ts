const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllPlayers = async () => {
    return await fetch(apiUrl + '/players', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const PlayerService = {
    getAllPlayers,
};

export default PlayerService;
