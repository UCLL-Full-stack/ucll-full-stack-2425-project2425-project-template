import { Bestelling } from "@/types";


const getAllBestellingen = async () => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bestellingen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
};

const getBestellingentById = async (id: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let token = null;

    if (user) {
        token = JSON.parse(user).token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bestellingen/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

const createBestelling = async (bestelling: Bestelling) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bestellingen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bestelling),
    })
}


const BestellingService = {
    getAllBestellingen,
    getBestellingentById,
    createBestelling
};

export default BestellingService;
