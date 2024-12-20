import { Auth, User } from '@types';

const getAllUsers = async () => {
    const token = localStorage.getItem('loggedInUser');
    console.log(sessionStorage.getItem('token'));
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getUserByEmail = async (email: string) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const token = loggedInUser.token;
    if (!token) {
        throw new Error('Log in first please');
    }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${email}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const userSignup = async (user: {
    name: string;
    email: string;
    password: string;
    birthday: Date;
}) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
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
    userSignup,
    authenticateUser,
};

export default userSerivce;
