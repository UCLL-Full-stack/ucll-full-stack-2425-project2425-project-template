import { CocktailIngredient } from '../model/cocktailIngredients';
import database from './database';

const getAllRelations = async (): Promise<CocktailIngredient[]> => {
    try{
    const cocktailIngredientPrisma = await database.cocktailIngredient.findMany();
    return cocktailIngredientPrisma.map((cocktailIngredientPrisma) => CocktailIngredient.from(cocktailIngredientPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
    
};

const getRelationById = async (id: number): Promise<CocktailIngredient | null> => {
    try{
    const cocktailIngredient = await database.cocktailIngredient.findUnique({
        where: { id },
    });
    return cocktailIngredient ? CocktailIngredient.from(cocktailIngredient) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
};

export const getIngredientsByCocktailId = async (cocktailId: number) => {
    return await database.cocktailIngredient.findMany({
        where: {
            cocktailId,
        },
        include: {
            ingredient: true, // Include ingredient details
        },
    });
};

export const getCocktailsByIngredientId = async (ingredientId: number) => {
    return await database.cocktailIngredient.findMany({
        where: {
            ingredientId,
        },
        include: {
            cocktail: true, // Include cocktail details
        },
    });
};

const addCocktailIngredient = async ({
    cocktailId,
    ingredientId,
    amount,
}: {
    cocktailId: number;
    ingredientId: number;
    amount: string;
}) => {
    return await database.cocktailIngredient.create({
        data: {
            cocktailId,
            ingredientId,
            amount,
        },
    });
};

const updateCocktailIngredient = async ({
    id,
    amount,
}: {
    id: number;
    amount: string;
}) => {
    return await database.cocktailIngredient.update({
        where: {
            id,
        },
        data: {
            amount,
        },
    });
};

const deleteCocktailIngredient = async ({ id }: { id: number }) => {
    return await database.cocktailIngredient.delete({
        where: {
            id,
        },
    });
};

export default {
    getAllRelations,
    getRelationById,
    getIngredientsByCocktailId,
    getCocktailsByIngredientId,
    addCocktailIngredient,
    updateCocktailIngredient,
    deleteCocktailIngredient,
};
