import recipeIngredientDb from "../repository/ingredient.db";

const getRecipeIngredientById = ({Id}: {Id: number}) => {
    const recipeIngredient = recipeIngredientDb.getRecipeIngredientById({id: Id});
    if (!recipeIngredient) {
        throw new Error(`RecipeIngredient with id: ${Id} does not exist.`);
    }
    return recipeIngredient;
}

export default {
    getRecipeIngredientById
}