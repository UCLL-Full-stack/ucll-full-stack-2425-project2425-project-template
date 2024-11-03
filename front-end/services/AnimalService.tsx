const getAnimals = async () => {    
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/animals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    })
};

const AnimalService = {
    getAnimals,
};

export default AnimalService;