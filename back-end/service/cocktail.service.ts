import { Cocktail } from '../model/cocktail';
import cocktailDB from '../repository/cocktails.db';

const getAllCocktails = (): Cocktail[] => cocktailDB.getAllCocktails();

const getCocktailById = ({ id }: { id: number }): Cocktail => {
    const cocktail = cocktailDB.getCocktailById({ id });
    if (!cocktail) {
        throw new Error(`Cocktail with id ${id} not found`);
    }
    return cocktail;
};

export default { getAllCocktails, getCocktailById };