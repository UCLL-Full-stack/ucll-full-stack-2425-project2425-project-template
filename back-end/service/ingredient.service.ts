import { UnauthorizedError } from "express-jwt";
import { Ingredient } from "../model/ingredient";
import ingredientDb from "../repository/ingredient.db"
import { IngredientInput, Rol } from "../types";

const getAllIngredienten = async ({ rol }: { rol: Rol }): Promise<Ingredient[]> => {
    if (rol === "Admin" || rol === "Manager") {
        return ingredientDb.getAllIngredienten();
    }
    else {
        throw new UnauthorizedError("credentials_required", {
            message: "You aren't authorized to access this page."
        });
    }
};

const addIngredient = async ({ naam, type, aantal, prijs }: IngredientInput): Promise<Ingredient> => {

    const newIngredient = await ingredientDb.getIngredientByNaam({ naam: naam });

    if (newIngredient) {
        throw new Error(`Ingredient ${naam} already exists.`);
    }


    const ingredient = new Ingredient({
        naam: naam,
        type: type,
        aantal: aantal,
        prijs: prijs
    });
    ingredientDb.addIngredient(ingredient);

    return ingredient;
};

const getIngredientById = async (id: number): Promise<Ingredient | null> => {
    const ingredient = await ingredientDb.getIngredientById({ id: id });
    if (!ingredient) {
        throw new Error(`Ingredient with id ${id} does not exist.`);
    } else {
        return ingredient;
    }
}

export default {
    getAllIngredienten,
    addIngredient,
    getIngredientById
}