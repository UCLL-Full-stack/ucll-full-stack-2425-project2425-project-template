import { UnauthorizedError } from 'express-jwt';
import { Recipe } from '../model/recipe';
import recipeDb from '../repository/recipe.db';
import { RecipeUpdateInput, Role } from '../types';

const getAllRecipes = async (userId: number, role: Role): Promise<Recipe[]> => {
    if (role === 'admin') {
        return await recipeDb.getAllRecipes();
    } else if (role === 'user') {
        return await recipeDb.getRecipesByUserId(userId);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'Guests can only see recipes from invited users.',
        });
    }
};

const getRecipeById = async (id: number): Promise<Recipe> => {
    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);

    return recipe;
};

const updateRecipe = async (
    id: number,
    recipeData: RecipeUpdateInput,
    userId: number,
    role: Role
): Promise<Recipe> => {
    if (role !== 'user' && role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'Only users can update their own recipes.',
        });
    }

    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);

    if (recipeData.title !== undefined && recipeData.title.trim() === '') {
        throw new Error('Invalid title');
    }

    recipe.updateRecipe(recipeData);
    await recipeDb.saveRecipe(recipe, userId);
    return recipe;
};

const deleteRecipe = async (id: number, role: Role): Promise<void> => {
    if (role !== 'user' && role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'Only users can delete their own recipes.',
        });
    }

    if (id <= 0) throw new Error('Invalid recipe ID');

    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);

    await recipeDb.deleteRecipe({ id });
};

export default { getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
