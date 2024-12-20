const getAllGroepen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/groep`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer span`,
        },
    });
};

const getGroepByNaam = async (naam: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/groep/${naam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer span`,
        },
    });
}

const GroepService = {
    getAllGroepen,
    getGroepByNaam
};

export default GroepService;