import { PlayerInput } from "@types";

const getAllPlayers = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/players', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getPlayerById = async (id: string) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
};

const getPlayerImage = async (id: number) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/image/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
};

const getPlayersFromUser = async (email: string) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/user/' + email, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
};

const createPlayer = async (player: PlayerInput) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/add', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(player),
    });
    return res;
}

const giveACoin = async (id: number) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/players/coin/' + id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
}

export default {
    getAllPlayers,
    getPlayerById,
    getPlayerImage,
    getPlayersFromUser,
    createPlayer,
    giveACoin,
};
