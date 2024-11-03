import {RecipeIngredient} from '../model/recipeingredient'

const recipeIngredients: RecipeIngredient[] = [
    new RecipeIngredient({
    recipeingredientId: 1,
    recipeId: 1,
    ingredientId: 1,
    unit: "grams",
    quantity: 250,
    })
];
const getRecipeById = ({ id }: { id: number }): RecipeIngredient | null => {
    try{
        return recipeIngredients.find((r) => r.getRecipeIngredientId() === id) || null;
    }catch(error){

    }


};

export default {
    getRecipeById
}