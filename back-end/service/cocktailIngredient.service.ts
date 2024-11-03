import cocktailIngredientDb from "../repository/cocktailIngredient.db";

// create or find existing ingredients for function
// create cocktail for the function
// create cocktailIngredient relations in one function






const getIngredientsByCocktailId = (cocktailId: number) => {
    return cocktailIngredientDb.getIngredientsByCocktailId(cocktailId);
};


export default {getIngredientsByCocktailId}