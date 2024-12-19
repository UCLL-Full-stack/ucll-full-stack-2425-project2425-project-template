import { Cocktail } from '../model/cocktail';
import database from './database';

const getAllCocktails = async (): Promise<Cocktail[]> => {
  try {
      const cocktailsPrisma = await database.cocktail.findMany();
      return cocktailsPrisma.map((cocktailPrisma) => Cocktail.from(cocktailPrisma));
  } catch (error) {
      console.error(error);
      throw new Error('Database error.');
  }
};

const getCocktailById = async (id: number): Promise<Cocktail | null> => {
  try {
    const cocktail = await database.cocktail.findUnique({
      where: { id },
    });

    if (!cocktail) {
      throw new Error(`Cocktail with id "${id}" not found`);
    }

    return cocktail ? Cocktail.from(cocktail) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error.');
  }
}

const addCocktail = async ({ name, description, strongness, image }: { name: string; description: string; strongness: number; image: string }): Promise<Cocktail> => {
  try {
    const newCocktail = await database.cocktail.create({
      data: {
        name,
        description,
        strongness,
        image,
      },
    });
    return Cocktail.from(newCocktail);
  } catch (error) {
    console.error(error);
    throw new Error('Database error.');
  }
}

const deleteCocktail = async (id: number): Promise<void> => {
  try {
    await database.cocktail.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Database error.');
  }
}

const updateCocktail = async ({ id, name, description, strongness, image }: { id: number; name: string; description: string; strongness: number; image: string }): Promise<Cocktail> => {
  try {
    const updatedCocktail = await database.cocktail.update({
      where: { id },
      data: {
        name,
        description,
        strongness,
        image,
      },
    });
    return Cocktail.from(updatedCocktail);
  } catch (error) {
    console.error(error);
    throw new Error('Database error.');
  }
}

export default { getAllCocktails, getCocktailById, addCocktail, deleteCocktail, updateCocktail };
