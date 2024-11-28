import database from '../util/database';
import { Recipe } from '../model/Recipe';

const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipePrisma = await database.recipe.findMany({
        include: {
            creator: true,
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
    });

    if (!recipePrisma) {
        return null;
    }

    return Recipe.from(recipePrisma);
};

const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const recipePrisma = await database.recipe.create({
        data: {
            name: recipe.name,
            description: recipe.description,
            creatorId: recipe.creator.id!, // Use non-null assertion to guarantee creatorId is defined
            ingredients: {
                create: recipe.recipeIngredients.map((ingredient) => ({
                    amount: ingredient.amount,
                    measurementType: ingredient.measurementType,
                    ingredientId: ingredient.ingredientId,
                })),
            },
        },
        include: {
            ingredients: true,
            creator: true,
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
