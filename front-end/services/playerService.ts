const getAllPlayers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/players', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
};

const getPlayerById = async (id: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
    return await res.json();
};

export default {
    getAllPlayers,
    getPlayerById,
};
