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

const getUserById = (userId: number) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    if (!token) {
        throw new Error("User is not logged in");
    }
    

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/findbyid/${userId}`, {

        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const UserService = {
    getUserById,
    loginUser,
    createUser,
};

export default UserService;