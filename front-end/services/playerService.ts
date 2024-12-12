const getAllPlayers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/players', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
};

const playerService = {
    getAllPlayers,
};
export default playerService;
