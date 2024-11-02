const getAllLecturers = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/players', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
};

export default {
    getAllLecturers,
};
