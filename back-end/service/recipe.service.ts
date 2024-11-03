import { Recipe } from '../model/recipe';
import recipeDb from '../repository/recipe.db';
import { RecipeUpdateInput } from '../types';

const getAllRecipes = (): Recipe[] => recipeDb.getAllRecipes();

const getRecipeById = (id: number): Recipe => {
    const recipe = recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);
    return recipe;
};

const updateRecipe = (id: number, recipeData: RecipeUpdateInput): Recipe => {
    const recipe = recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);

    if (recipeData.title !== undefined && recipeData.title.trim() === '') {
        throw new Error('Invalid title');
    }

    recipe.updateRecipe(recipeData);
    recipeDb.saveRecipe(recipe);
    return recipe;
};

const deleteRecipe = (id: number): void => {
    if (id <= 0) throw new Error('Invalid recipe ID');

    const recipe = recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);
    recipeDb.deleteRecipe({ id });
};

export default { getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
