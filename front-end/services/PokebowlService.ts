import { Pokebowl } from "@/types";

const getAllPokebowls = async () => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/pokebowls", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

};

const getPokebowlById = async (id: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/pokebowls/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
}

const createPokebowl = async (pokebowl: Pokebowl) => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/pokebowls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(pokebowl)
    })
}

const PokebowlService = {
    getAllPokebowls,
    getPokebowlById,
    createPokebowl
};

export default PokebowlService;
