import { User } from "@types";

const getToken = () => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
        const parsedUser = JSON.parse(user)
        if (parsedUser.role === 'admin') {
            return parsedUser?.token;
        }
    }
    return null;
};

const getUsers = async () => {
    const token = getToken();

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const loginUser = async (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    getUsers,
    loginUser,
};

export default UserService;
