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

const addIngredient = async ({ rol }: { rol: Rol }, { naam, type, aantal, prijs }: IngredientInput): Promise<Ingredient> => {
    if (rol === "Admin" || rol === "Manager") {


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
    } else {
        throw new UnauthorizedError("credentials_required", {
            message: "You aren't authorized to add new ingredients"
        });
    }
};

const getIngredientById = async (id: number): Promise<Ingredient | null> => {
    const ingredient = await ingredientDb.getIngredientById({ id: id });
    if (!ingredient) {
        throw new Error(`Ingredient with id ${id} does not exist.`);
    } else {
        return ingredient;
    }
}

const updateIngredient = async (id: number, { naam, type, aantal, prijs, ingredientLimit }: IngredientInput): Promise<Ingredient> => {

    const newIngredient = await ingredientDb.getIngredientById({ id: id });

    if (!newIngredient) {
        throw new Error(`Ingredient ${id} doesn't exists.`);
    }

    const ingredient = new Ingredient({
        naam: naam,
        type: type,
        aantal: aantal,
        prijs: prijs,
        ingredientLimit: ingredientLimit
    });
    ingredientDb.updateIngredient(id, ingredient);

    return ingredient;
};

export default {
    getAllIngredienten,
    addIngredient,
    getIngredientById,
    updateIngredient
}