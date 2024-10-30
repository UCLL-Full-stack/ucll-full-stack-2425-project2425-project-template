const getAllBestellingen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bestellingen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
};

const getBestellingentById = async (id: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bestellingen/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const BestellingService = {
    getAllBestellingen,
    getBestellingentById
};

export default BestellingService;
