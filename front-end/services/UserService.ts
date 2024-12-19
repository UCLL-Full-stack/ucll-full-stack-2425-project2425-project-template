import { authUser, User } from '@types';

const getAllUsers = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getUserById = async (id: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getUserByName = async (name: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/name/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const createUser = async (user: User) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const loginUser = (user: authUser) => {
    console.log("service", user);
    console.log("process.env.NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL)
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    loginUser,
};

export default UserService;
