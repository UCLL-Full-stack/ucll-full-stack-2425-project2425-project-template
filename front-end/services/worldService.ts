import { WorldInput } from '@types';

const getWorldById = async (id: string) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/world/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return await res.json();
};

const getWorlds = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/world/', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
};

const generateWorld = async (world: WorldInput) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/world/add', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(world),
    });
    return res;
};

export default {
    getWorldById,
    getWorlds,
    generateWorld,
};
