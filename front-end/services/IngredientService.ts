import { Ingredient } from "@/types";

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

const addIngredient = async (ingredient: Ingredient) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ingredienten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredient)
    })
}

const IngredientenService = {
    getAllIngredienten,
    getIngredientById,
    addIngredient
};

export default IngredientenService;
