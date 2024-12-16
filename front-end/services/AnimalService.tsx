const getToken = () => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
        return JSON.parse(user)?.token;
    }
    return null;
};

const getAnimals = async () => {
    const token = getToken();

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/animals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getAnimalsByCaretaker = async (username: string) => {
    try {
        const token = getToken();
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/animals/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        if (!response.ok) {

            throw new Error(`Failed to fetch animals. Status: ${response.status}`);
        }

        // const animals = await response.json();

        // if (!Array.isArray(animals)) {
        //     console.error('Expected an array of animals, but got:', animals);
        //     return []; // Return an empty array if the response is not an array
        // }
        // console.log(animals);
        return response;
    } catch (error) {
        console.error('Error fetching animals:', error);
        return []; // Return an empty array in case of an error
    }
};

const AnimalService = {
    getAnimals,
    getAnimalsByCaretaker,
};

export default AnimalService;
