import { Cocktail } from '../model/cocktail';
import database from '../util/database';

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

export default { getAllCocktails, getCocktailById, addCocktail };
