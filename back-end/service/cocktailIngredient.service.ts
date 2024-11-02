import cocktailIngredientDb from "../repository/cocktailIngredient.db";

const getIngredientsByCocktailId = (cocktailId: number) => {
    return cocktailIngredientDb.getIngredientsByCocktailId(cocktailId);
};


export default {getIngredientsByCocktailId}