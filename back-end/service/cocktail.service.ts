import { Cocktail } from '../model/cocktail';
import cocktailDb from '../repository/cocktail.db';

const getAllCocktails = async (): Promise<Cocktail[]> => cocktailDb.getAllCocktails();

const getCocktailById = async ({ id }: { id: number }): Promise<Cocktail> => {
    const cocktail = await cocktailDb.getCocktailById(id);
    if (!cocktail) {
        throw new Error(`Cocktail with id ${id} not found`);
    }
    return cocktail;
};

const addCocktail = async ({ name, description, strongness, image }: { name: string; description: string; strongness: number; image: string }): Promise<Cocktail> => {
    const newCocktail = await cocktailDb.addCocktail({ name, description, strongness, image });
    return newCocktail;
};

export default { getAllCocktails, getCocktailById,addCocktail };