import { Auth } from '@types';

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

const authenticateUser = async (auth: Auth) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(auth),
    });
};

const userSerivce = {
    getAllUsers,
    getUserByEmail,
    authenticateUser,
};

export default userSerivce;
