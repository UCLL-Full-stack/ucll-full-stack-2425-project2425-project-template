import { Recipe } from '../model/recipe';
import recipeDb from '../repository/recipe.db';

const getAllRecipes = (): Recipe[] => recipeDb.getAllRecipes();

const getRecipeById = (id: number): Recipe => {
    const recipe = recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);
    return recipe;
};

export default { getRecipeById };
