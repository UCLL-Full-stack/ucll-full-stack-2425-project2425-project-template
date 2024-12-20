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


const deleteCocktail = async (id: number): Promise<void> => {
    const cocktail = await cocktailDb.getCocktailById(id);
    if (!cocktail) {
        throw new Error(`Cocktail with id ${id} not found`);
    }
    await cocktailDb.deleteCocktail(id);
};

const updateCocktail = async ({ id, name, description, strongness, image }: { id: number; name: string; description: string; strongness: number; image: string }): Promise<Cocktail> => {
    const cocktail = await cocktailDb.getCocktailById(id);
    if (!cocktail) {
        throw new Error(`Cocktail with id ${id} not found`);
    }
    const updatedCocktail = await cocktailDb.updateCocktail({ id, name, description, strongness, image });
    return updatedCocktail;
};


export default { getAllCocktails, getCocktailById,addCocktail, deleteCocktail, updateCocktail };