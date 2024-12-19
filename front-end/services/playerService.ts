import { PlayerInput } from "@types";

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

const getPlayerImage = async (id: number) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/image/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
    return await res.json();
};

const getPlayersFromUser = async (email: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/user/' + email, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
    return await res.json();
}

const createPlayer = async (player: PlayerInput) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/add', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(player),
    });
    return res;
}

export default {
    getAllPlayers,
    getPlayerById,
    getPlayerImage,
    getPlayersFromUser,
    createPlayer,
};
