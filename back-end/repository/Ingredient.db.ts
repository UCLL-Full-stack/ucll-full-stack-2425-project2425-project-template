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
