import database from '../util/database';
import { Recipe } from '../model/Recipe';

const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipePrisma = await database.recipe.findMany({
        include: {
            reviews: true,
        },
    });

    if (!recipePrisma || recipePrisma.length === 0) {
        return [];
    }

    return recipePrisma.map((recipePrisma) => Recipe.from(recipePrisma));
};

const getRecipeById = async (id: number): Promise<Recipe | null> => {
    const recipePrisma = await database.recipe.findUnique({
        where: {
            id: id,
        },
        include: {
            reviews: true,
        },
    });

    if (!recipePrisma) {
        return null;
    }

    return Recipe.from(recipePrisma);
};

const createRecipe = async ({ name, description }: Recipe): Promise<Recipe> => {
    const recipePrisma = await database.recipe.create({
        data: {
            name,
            description,
            user: {
                connect: { id: user.id },
            },
        },
        include: {
            reviews: true,
        },
    });

    return Recipe.from(recipePrisma);
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
};
