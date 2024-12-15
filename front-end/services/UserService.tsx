const getUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const UserService = {
    getUsers,
};

export default UserService;
