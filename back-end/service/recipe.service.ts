import recipeDb from "../repository/recipe.db"
import { Recipe } from "../model/recipe";
import { RecipeInput } from "../types";

const getAllRecipes = async (): Promise<Recipe[]> => {
    return recipeDb.getAllRecipes();
}

const createRecipe = (recipe?: RecipeInput) => ({})

export default { getAllRecipes }