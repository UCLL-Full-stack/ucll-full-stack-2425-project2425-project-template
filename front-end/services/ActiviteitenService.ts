const getAllActiviteiten = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/activiteit', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const getActiviteitenByGroupName = async (groepNaam: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activiteit/${groepNaam}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const ActiviteitenService = {
    getAllActiviteiten,
    getActiviteitenByGroupName,
};

export default ActiviteitenService;