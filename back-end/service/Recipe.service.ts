import RecipeDb from "../repository/Recipe.db";
import { Recipe } from "../model/Recipe";

const getAllRecipes = async (): Promise<Recipe[]> => {
    return RecipeDb.getAllRecipes();
};

const getRecipeById = async (id: number): Promise<Recipe | null> => {
    return RecipeDb.getRecipeById(id);
};

const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    return RecipeDb.createRecipe(recipe);
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
};