import { PositionUpdate } from "@types";

const getFloorById = async (id: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/floor/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

    return await res.json();
};

const getFloorPositions = async (id: number) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/floor/' + id + '/positions', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

    return await res.json();
};

const updatePosition = async (toUpdate: PositionUpdate) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/floor/${toUpdate.floorID}/position`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toUpdate),
    })
    return await res.json();
}

export default {
    getFloorById,
    getFloorPositions,
    updatePosition,
};