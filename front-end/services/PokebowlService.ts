const getAllPokebowls = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/pokebowls", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
};

const getPokebowlById = async (id: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/pokebowls/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const PokebowlService = {
    getAllPokebowls,
    getPokebowlById
};

export default PokebowlService;
