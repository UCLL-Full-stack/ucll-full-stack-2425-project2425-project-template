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

export default {
    getFloorById,
    getFloorPositions,
};