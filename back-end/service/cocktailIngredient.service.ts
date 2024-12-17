import { CocktailIngredient } from "../model/cocktailIngredients";
import cocktailIngredientDb from "../repository/cocktailIngredient.db";
import ingredientDb from "../repository/ingredient.db";

// create or find existing ingredients for function
// create cocktail for the function
// create cocktailIngredient relations in one function
// needed for final cocktailcreation implementation



const getRelationById = async ( id: number ): Promise<CocktailIngredient> => {
    const cocktailIngredient =await cocktailIngredientDb.getRelationById(id);
    if (!cocktailIngredient) {
        throw new Error(`Relation with id ${id} not found`);
    }
    return cocktailIngredient;
};

const getAllRelations = async (): Promise<CocktailIngredient[]> => {
    const relations = await cocktailIngredientDb.getAllRelations();
    return relations;
};

const getIngredientsByCocktailId = (cocktailId: number) => {
    return cocktailIngredientDb.getIngredientsByCocktailId(cocktailId);
};

const getCocktailsByIngredientId = (ingredientId: number) => {
    return cocktailIngredientDb.getCocktailsByIngredientId(ingredientId);
};

export default {getIngredientsByCocktailId, getCocktailsByIngredientId, getRelationById,getAllRelations}