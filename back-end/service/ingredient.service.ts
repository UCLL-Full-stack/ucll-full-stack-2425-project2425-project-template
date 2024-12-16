import {  Ingredient } from '../model/ingredient';
import ingredientDb from '../repository/ingredient.db';

const getAllIngredients = async (): Promise<Ingredient[]> => {
    const ingredients = await ingredientDb.getAllIngredients();
    return ingredients;
};

const getIngredientById = async ({ id }: { id: number }): Promise<Ingredient> => {
    const ingredient = await ingredientDb.getIngredientById({ id });
    if (!ingredient) {
        throw new Error(`Ingredient with id ${id} not found`);
    }
    return ingredient;
};

const addIngredient = async (ingredient: Ingredient): Promise<Ingredient> => ingredientDb.addIngredient(ingredient.getName());



export default { getAllIngredients, getIngredientById, addIngredient };