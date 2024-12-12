import {RecipeIngredient} from '../model/recipeingredient'

const recipeIngredients: RecipeIngredient[] = [
    new RecipeIngredient({
    recipeIngredientId: 1,
    recipeId: 1,
    ingredientId: 1,
    unit: "grams",
    quantity: 250,
    }),
    new RecipeIngredient({
        recipeIngredientId: 2,
        recipeId: 1,
        ingredientId: 2,
        unit: "grams",
        quantity: 250,
    })
];
const getRecipeIngredientById = ({ id }: { id: number }): RecipeIngredient | null => {
    return recipeIngredients.find((r) => r.getRecipeIngredientId() === id) || null
};

export default {
    getRecipeIngredientById
}