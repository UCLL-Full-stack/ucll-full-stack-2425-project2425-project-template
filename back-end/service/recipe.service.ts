import { Recipe } from '../model/recipe';
import recipeDb from '../repository/recipe.db';
import { RecipeUpdateInput } from '../types';

const getAllRecipes = async (): Promise<Recipe[]> => {
    return await recipeDb.getAllRecipes();
};

const getRecipeById = async (id: number): Promise<Recipe> => {
    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);
    return recipe;
};

const updateRecipe = async (
    id: number,
    recipeData: RecipeUpdateInput,
    userId: number
): Promise<Recipe> => {
    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);

    if (recipeData.title !== undefined && recipeData.title.trim() === '') {
        throw new Error('Invalid title');
    }

    recipe.updateRecipe(recipeData);
    await recipeDb.saveRecipe(recipe, userId);
    return recipe;
};

const deleteRecipe = async (id: number): Promise<void> => {
    if (id <= 0) throw new Error('Invalid recipe ID');

    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);
    await recipeDb.deleteRecipe({ id });
};

export default { getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
