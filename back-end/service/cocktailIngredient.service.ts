import { CocktailIngredient } from "../model/cocktailIngredients";
import cocktailIngredientDb from "../repository/cocktailIngredient.db";

// create or find existing ingredients for function
// create cocktail for the function
// create cocktailIngredient relations in one function
// needed for final cocktailcreation implementation



const getRelationById = ({ id }: { id: number }): CocktailIngredient => {
    const cocktailIngredient = cocktailIngredientDb.getRelationById({ id });
    if (!cocktailIngredient) {
        throw new Error(`Relation with id ${id} not found`);
    }
    return cocktailIngredient;
};

const getAllRelations = (): CocktailIngredient[] => cocktailIngredientDb.getAllRelations();

const getIngredientsByCocktailId = (cocktailId: number) => {
    return cocktailIngredientDb.getIngredientsByCocktailId(cocktailId);
};

const getCocktailsByIngredientId = (ingredientId: number) => {
    return cocktailIngredientDb.getCocktailsByIngredientId(ingredientId);
};

export default {getIngredientsByCocktailId, getCocktailsByIngredientId, getRelationById,getAllRelations}