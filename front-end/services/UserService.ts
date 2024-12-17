import { User } from "@/types";
import { use } from "react";

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

const getAllUsers = () => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteUser = async (id: number) => { 
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
};

const updateUser = async (id: number, userData: Partial<User>) => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
};

const register = async (user: { naam: string; voornaam: string; adres: string; email: string; gebruikersnaam: string; wachtwoord: string }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
};

const UserService = {
    login,
    getUserById,
    getUserBestellingen,
    getAllUsers,
    deleteUser,
    updateUser,
    register
};

export default UserService;