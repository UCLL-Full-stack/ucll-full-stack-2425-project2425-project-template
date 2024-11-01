const getAllActiviteiten = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/activiteit', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const ActiviteitenService = {
  getAllActiviteiten,
};

export default ActiviteitenService;