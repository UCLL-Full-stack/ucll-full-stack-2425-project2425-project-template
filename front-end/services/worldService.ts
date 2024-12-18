const getWorldById = async (id: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/world/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

    return await res.json();
};

export default {
    getWorldById,
};