import { User } from "@/types";

const login = async (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
};


const getUserById = async (id: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

const getUserBestellingen = async (id: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id + "/bestellingen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

const UserService = {
    login,
    getUserById,
    getUserBestellingen
};

export default UserService;