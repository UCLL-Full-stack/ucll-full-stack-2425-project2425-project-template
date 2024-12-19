import { IngredientCategory, RecipeCategory } from '@prisma/client';
import { Recipe } from '../model/recipe';
import database from './database';
import { Ingredient } from '../model/ingredient';

const getAllRecipes = async (): Promise<Recipe[]> => {
    try {
        const recipesPrisma = await database.recipe.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        return recipesPrisma.map((recipePrisma) => Recipe.from(recipePrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details');
    }
};

const getRecipesByUserId = async (userId: number): Promise<Recipe[]> => {
    try {
        const recipesPrisma = await database.recipe.findMany({
            where: { userId: userId },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        return recipesPrisma.map((recipePrisma) => Recipe.from(recipePrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details');
    }
};

const getRecipeById = async ({ id }: { id: number }): Promise<Recipe | null> => {
    try {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('Invalid id type');
        }

        const recipePrisma = await database.recipe.findUnique({
            where: { id: id },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        return recipePrisma ? Recipe.from(recipePrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details');
    }
};

// Method to get ingredient ID by name and category
const getIngredientIdByName = async (name: string): Promise<number | null> => {
    const ingredient = await database.ingredient.findUnique({
        where: {
            name: name,
        },
    });
    return ingredient ? ingredient.id : null;
};

// Method to add a new ingredient
const addIngredient = async (name: string, category: IngredientCategory): Promise<Ingredient> => {
    const newIngredient = await database.ingredient.create({
        data: {
            name,
            category,
        },
    });
    return Ingredient.from(newIngredient);
};

const addRecipe = async (recipe: Recipe, userId: number): Promise<Recipe> => {
    try {
        const category = recipe.getCategory().toUpperCase() as RecipeCategory;
        const scheduledDate =
            recipe.getScheduledDate() instanceof Date
                ? recipe.getScheduledDate()?.toISOString()
                : null;

        const ingredients = await Promise.all(
            recipe.getIngredients()?.map(async (ingredient) => {
                const ingredientData = ingredient.getIngredient();
                const ingredientName = ingredientData?.getName() || '';
                const ingredientCategory =
                    (ingredientData?.getCategory()?.toUpperCase() as IngredientCategory) || 'Other';

                let ingredientId = ingredientData?.getId();
                if (!ingredientId) {
                    ingredientId = (await getIngredientIdByName(ingredientName)) ?? undefined;

                    if (!ingredientId) {
                        const newIngredient = await addIngredient(
                            ingredientName,
                            ingredientCategory
                        );
                        ingredientId = newIngredient.getId();
                    }
                }

                if (ingredientId === undefined) {
                    throw new Error(`Ingredient ID not found for ingredient: ${ingredientName}`);
                }

                return {
                    unit: ingredient.getUnit(),
                    quantity: ingredient.getQuantity(),
                    ingredientId,
                };
            }) ?? []
        );

        const newRecipePrisma = await database.recipe.create({
            data: {
                title: recipe.getTitle(),
                instructions: recipe.getInstructions(),
                cookingTime: recipe.getCookingTime(),
                category,
                imageUrl: recipe.getImageUrl() || null,
                isFavorite: recipe.getIsFavorite() || false,
                notes: recipe.getNotes() || null,
                source: recipe.getSource() || null,
                scheduledDate,
                userId,
                ingredients: {
                    create: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.ingredientId,
                        unit: ingredient.unit,
                        quantity: ingredient.quantity,
                    })),
                },
            },
            include: {
                ingredients: true,
            },
        });

        return Recipe.from(newRecipePrisma);
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};

const saveRecipe = async (recipe: Recipe, userId: number): Promise<Recipe> => {
    try {
        const existingRecipePrisma = await database.recipe.upsert({
            where: {
                id: recipe.getId(),
            },
            update: {
                title: recipe.getTitle(),
                instructions: recipe.getInstructions(),
                cookingTime: recipe.getCookingTime(),
                category: recipe.getCategory() as RecipeCategory,
                imageUrl: recipe.getImageUrl(),
                isFavorite: recipe.getIsFavorite(),
                notes: recipe.getNotes(),
                source: recipe.getSource(),
                scheduledDate: recipe.getScheduledDate() ?? null, // scheduledDate set to null if undefined
                ingredients: {
                    deleteMany: {},
                    create: recipe.getIngredients()?.map((ingredient) => ({
                        ingredientId: ingredient.getIngredientId(),
                        unit: ingredient.getUnit(),
                        quantity: ingredient.getQuantity(),
                    })),
                },
            },
            create: {
                title: recipe.getTitle(),
                instructions: recipe.getInstructions(),
                cookingTime: recipe.getCookingTime(),
                category: recipe.getCategory() as RecipeCategory,
                userId: userId,
                imageUrl: recipe.getImageUrl(),
                isFavorite: recipe.getIsFavorite(),
                notes: recipe.getNotes(),
                source: recipe.getSource(),
                scheduledDate: recipe.getScheduledDate() ?? null,
                ingredients: {
                    create: recipe.getIngredients()?.map((ingredient) => ({
                        ingredientId: ingredient.getIngredientId(),
                        unit: ingredient.getUnit(),
                        quantity: ingredient.getQuantity(),
                    })),
                },
            },
            include: {
                ingredients: true,
            },
        });
        return Recipe.from(existingRecipePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details');
    }
};

const deleteRecipe = async ({ id }: { id: number }): Promise<void> => {
    try {
        // delete relationship first
        await database.recipeIngredient.deleteMany({
            where: { recipeId: id },
        });

        // delete recipe
        await database.recipe.delete({
            where: { id },
        });
    } catch (error) {
        console.error(`Error deleting recipe with id ${id}:`, error);
        throw error;
    }
};

export default {
    getAllRecipes,
    addRecipe,
    saveRecipe,
    deleteRecipe,
    getRecipeById,
    getRecipesByUserId,
};
