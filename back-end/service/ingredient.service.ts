import { Ingredient } from "../model/ingredient";
import ingredientDb from "../repository/ingredient.db"
import { IngredientInput } from "../types";

const getAllIngredienten = async (): Promise<Ingredient[]> => ingredientDb.getAllIngredienten();

const addIngredient = async ({ naam, type, aantal, prijs }: IngredientInput): Promise<Ingredient> => {

    const ingredient = new Ingredient({
        naam: naam,
        type: type,
        aantal: aantal,
        prijs: prijs
    });
    ingredientDb.addIngredient(ingredient);

    return ingredient;
};

export default { getAllIngredienten, addIngredient }