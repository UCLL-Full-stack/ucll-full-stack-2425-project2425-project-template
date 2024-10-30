const getAllIngredienten = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ingredienten", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
};

const getIngredientById = async (id: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ingredienten/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const IngredientenService = {
    getAllIngredienten,
    getIngredientById
};

export default IngredientenService;
