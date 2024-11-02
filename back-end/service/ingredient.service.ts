import {  Ingredient } from '../model/ingredient';
import ingredientDb from '../repository/ingredient.db';

const getAllIngredients = (): Ingredient[] => ingredientDb.getAllIngredients();

const getIngredientById = ({ id }: { id: number }): Ingredient => {
    const ingredient = ingredientDb.getIngredientById({ id });
    if (!ingredient) {
        throw new Error(`Ingredient with id ${id} not found`);
    }
    return ingredient;
};

const addIngredient = (ingredientName: string): Ingredient => {
    const newIngredient = new Ingredient(0, ingredientName);
    
    return ingredientDb.addIngredient(newIngredient);
};


export default { getAllIngredients, getIngredientById, addIngredient };