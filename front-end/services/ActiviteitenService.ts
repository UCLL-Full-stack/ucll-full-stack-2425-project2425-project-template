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

const addActiviteit = async (groepNaam: string, naam: string, beschrijving: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activiteit/${groepNaam}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "naam": naam,
            "beschrijving": beschrijving,
        })
    })
};

const ActiviteitenService = {
    getAllActiviteiten,
    getActiviteitenByGroupName,
    addActiviteit,
};

export default ActiviteitenService;