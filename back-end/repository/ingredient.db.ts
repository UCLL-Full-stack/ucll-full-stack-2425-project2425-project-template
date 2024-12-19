import { Ingredient } from '../model/ingredient';
import database from '../util/database';

const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredientPrisma = await database.ingredient.findMany();
        return ingredientPrisma.map((ingredientPrisma) => Ingredient.from(ingredientPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
  };

const getIngredientById = async ({ id }: { id: number }): Promise<Ingredient | null> => {
    try {
        const ingredientPrisma = await database.ingredient.findUnique({
            where: { id },
        });

        return ingredientPrisma ? Ingredient.from(ingredientPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
}

const addIngredient = async (ingredientName: string): Promise<Ingredient> => {
    try {
        const ingredientPrisma = await database.ingredient.create({
            data: {
                name: ingredientName,
            },
        });
        return Ingredient.from(ingredientPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
}


export default {
    getAllIngredients,
    getIngredientById,
    addIngredient,
};
