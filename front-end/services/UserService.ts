const login = async (username: string, password: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
};

const getUserById = async (id: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const getUserBestellingen = async (id: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id + "/bestellingen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const UserService = {
    login,
    getUserById,
    getUserBestellingen
};

export default UserService;