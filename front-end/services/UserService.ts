import { User } from "@types";

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const createUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    loginUser,
    createUser,
};

export default UserService;