import { Position, PositionInput, PositionUpdate } from '@types';

const getFloorById = async (id: string) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/floor/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return await res.json();
};

const getFloorPositions = async (id: number): Promise<Position[]> => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/floor/' + id + '/positions', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return await res.json();
};

const updatePosition = async (toUpdate: PositionUpdate) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/floor/${toUpdate.floorID}/position`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(toUpdate),
        }
    );
    return await res.json();
};

const addPosition = async (position: PositionInput) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/floor/${position.floorID}/position`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(position),
        }
    );
    return await res.json();
};

export default {
    getFloorById,
    getFloorPositions,
    updatePosition,
    addPosition,
};
