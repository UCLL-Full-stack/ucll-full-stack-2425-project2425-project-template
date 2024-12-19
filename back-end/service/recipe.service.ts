import { UnauthorizedError } from 'express-jwt';
import { Recipe } from '../model/recipe';
import recipeDb from '../repository/recipe.db';
import { RecipeUpdateInput, Role, NewRecipeInput, RecipeCategory } from '../types';
import userDb from '../repository/user.db';
import { RecipeIngredient } from '../model/recipeIngredient';
import { Ingredient } from '../model/ingredient';

const getRecipesByUserId = async (userId: number): Promise<Recipe[]> => {
    return await recipeDb.getRecipesByUserId(userId);
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
    if (role === 'guest') {
        throw new UnauthorizedError('credentials_required', {
            message: 'Guests cannot update recipes.',
        });
    }

    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);

    const user = await userDb.getUserById({ id: userId });
    if (!user) throw new Error(`User with id ${userId} does not exist.`);

    if (!user.hasRecipe(id)) {
        throw new UnauthorizedError('credentials_required', {
            message: 'You do not have permission to update this recipe.',
        });
    }

    recipe.updateRecipe(recipeData);
    await recipeDb.saveRecipe(recipe, userId);
    return recipe;
};

const deleteRecipe = async (id: number, userId: number, role: Role): Promise<void> => {
    if (role === 'guest') {
        throw new UnauthorizedError('credentials_required', {
            message: 'Guests cannot delete recipes.',
        });
    }

    if (id <= 0) throw new Error('Invalid recipe ID');

    const recipe = await recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);

    const user = await userDb.getUserById({ id: userId });
    if (!user) throw new Error(`User with id ${userId} does not exist.`);

    if (!user.hasRecipe(id)) {
        throw new UnauthorizedError('credentials_required', {
            message: 'You do not have permission to delete this recipe.',
        });
    }

    await recipeDb.deleteRecipe({ id });
};

const getFavoriteRecipesByUserId = async (userId: number): Promise<Recipe[]> => {
    const recipes = await recipeDb.getRecipesByUserId(userId);
    return recipes.filter((recipe) => recipe.getIsFavorite());
};

const createRecipe = async (recipeData: NewRecipeInput, userId: number): Promise<Recipe> => {
    const ingredients: RecipeIngredient[] = recipeData.ingredients.map(
        (ingredient) =>
            new RecipeIngredient({
                recipeId: 0,
                ingredientId: ingredient.id,
                ingredient: new Ingredient({
                    id: ingredient.id,
                    name: ingredient.name,
                    category: ingredient.category,
                }),
                unit: ingredient.unit,
                quantity: ingredient.quantity,
            })
    );

    const recipe = new Recipe({
        ...recipeData,
        category: recipeData.category as RecipeCategory,
        ingredients,
    });
    return await recipeDb.addRecipe(recipe, userId);
};

export default {
    getRecipesByUserId,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getFavoriteRecipesByUserId,
    createRecipe,
};
