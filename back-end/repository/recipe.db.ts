import { Recipe } from '../model/recipe';
import { User } from '../model/user';
import { RecipeIngredient } from '../model/recipeIngredient';
import { Ingredient } from '../model/ingredient';
import { Profile } from '../model/profile';

export default {
    getAllRecipes: (): Recipe[] => recipes,
    getRecipeById: ({ id }: { id: number }): Recipe | null => {
        return recipes.find((recipe) => recipe.getId() === id) || null;
    },
    addRecipe: (recipe: Recipe): Recipe => {
        recipes.push(recipe);
        return recipe;
    },
    saveRecipe: (recipe: Recipe): Recipe => {
        const existingRecipeIndex = recipes.findIndex((r) => r.getId() === recipe.getId());
        if (existingRecipeIndex >= 0) {
            recipes[existingRecipeIndex] = recipe;
        } else {
            const newId =
                recipes.length > 0 ? Math.max(...recipes.map((r) => r.getId() || 0)) + 1 : 1;
            recipe.setId(newId);
            recipes.push(recipe);
        }
        return recipe;
    },
    deleteRecipe: ({ id }: { id: number }): void => {
        const recipeIndex = recipes.findIndex((recipe) => recipe.getId() === id);
        if (recipeIndex >= 0) {
            recipes.splice(recipeIndex, 1);
        } else {
            throw new Error(`Recipe with id ${id} does not exist.`);
        }
    },
};
