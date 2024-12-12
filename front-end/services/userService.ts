const getAllUsers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
};

const getUserByEmail = async (email: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + email, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
};

const authenticateUser = async (email: string, password: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/authenticate', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

const userSerivce = {
    getAllUsers,
    getUserByEmail,
    authenticateUser,
};

export default userSerivce;
