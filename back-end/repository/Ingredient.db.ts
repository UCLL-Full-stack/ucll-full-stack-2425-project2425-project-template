import { Ingredient } from "../model/Ingredient";
import database from "../util/database";

const getAllIngredients = async (): Promise<Ingredient[]> => {
    const ingredientPrisma = await database.ingredient.findMany();

    if (!ingredientPrisma || ingredientPrisma.length === 0) {
        return [];
    }

    // here we use prisma because we are getting the data from the database and need to transform it into the layout of our model
    return ingredientPrisma.map((ingredientPrisma) => Ingredient.from(ingredientPrisma));
};

const getIngredientById = async (id: number): Promise<Ingredient | null> => {
    const ingredientPrisma = await database.ingredient.findUnique({
        where: {
            id: id,
        },
    });

    if (!ingredientPrisma) {
        return null;
    }

    return Ingredient.from(ingredientPrisma);
};

const createIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    const ingredientPrisma = await database.ingredient.create({
        data: {
            name: ingredient.name,
            category: ingredient.category,
        },
    });

    return Ingredient.from(ingredientPrisma);
};

export default {
    getAllIngredients,
    getIngredientById,
    createIngredient,
};