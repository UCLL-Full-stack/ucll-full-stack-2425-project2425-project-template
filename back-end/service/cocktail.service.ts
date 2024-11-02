import { Cocktail } from '../model/cocktail';
import cocktailDb from '../repository/cocktail.db';

const getAllCocktails = (): Cocktail[] => cocktailDb.getAllCocktails();

const getCocktailById = ({ id }: { id: number }): Cocktail => {
    const cocktail = cocktailDb.getCocktailById({ id });
    if (!cocktail) {
        throw new Error(`Cocktail with id ${id} not found`);
    }
    return cocktail;
};

const addCocktail = ({ name, description, strongness, imageUrl }: { name: string; description: string; strongness: number; imageUrl: string }): Cocktail => {
    return cocktailDb.addCocktail({ name, description, strongness, imageUrl });
};

export default { getAllCocktails, getCocktailById,addCocktail };