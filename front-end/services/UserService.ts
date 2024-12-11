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

const loginUser = async (user: UserInput) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

const UserService = {
    createUser,
    loginUser,
}

export default UserService;