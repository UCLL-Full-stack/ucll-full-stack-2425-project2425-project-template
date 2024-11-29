import { UserInput } from "types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const createUser = async (user: UserInput) => {
    return fetch(apiUrl + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

const UserService = {
    createUser,
}

export default UserService;