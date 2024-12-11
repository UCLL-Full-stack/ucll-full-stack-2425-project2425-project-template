import { Type } from "@prisma/client";
import { Ingredient } from "../model/ingredient";
import database from "./database";


const getAllIngredienten = async (): Promise<Ingredient[]> => {
    try {
        const ingredientenPrisma = await database.ingredient.findMany({
        });
        return ingredientenPrisma.map((ingredientPrisma) => Ingredient.from(ingredientPrisma));
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }

};

const addIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    try {
        const ingredientenPrisma = await database.ingredient.create({
            data: {
                naam: ingredient.getNaam(),
                type: ingredient.getType() as Type,
                aantal: ingredient.getAantal(),
                prijs: ingredient.getPrijs(),
                ingredientLimit: ingredient.getIngredientLimit() ?? 0
            }
        });
        return Ingredient.from(ingredientenPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
};

const updateIngredient = async (id: number, ingredient: Ingredient): Promise<Ingredient> => {
    try {
        const ingredientenPrisma = await database.ingredient.update({
            where: {
                id: id
            },
            data: {
                naam: ingredient.getNaam(),
                type: ingredient.getType() as Type,
                aantal: ingredient.getAantal(),
                prijs: ingredient.getPrijs(),
                ingredientLimit: ingredient.getIngredientLimit() ?? 0
            }
        });
        return Ingredient.from(ingredientenPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
}

const getIngredientById = async ({ id }: { id: number }): Promise<Ingredient | null> => {
    try {
        const ingredientenPrisma = await database.ingredient.findUnique({
            where: {
                id: id
            }
        });
        if (ingredientenPrisma == null) {
            return null;
        }
        return Ingredient.from(ingredientenPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
};

const getIngredientByNaam = async ({ naam }: { naam: string }): Promise<Ingredient | null> => {
    try {
        const ingredientenPrisma = await database.ingredient.findUnique({
            where: {
                naam: naam
            }
        });
        if (ingredientenPrisma == null) {
            return null;
        }
        return Ingredient.from(ingredientenPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
}

export default {
    getAllIngredienten,
    addIngredient,
    getIngredientById,
    getIngredientByNaam,
    updateIngredient
}
