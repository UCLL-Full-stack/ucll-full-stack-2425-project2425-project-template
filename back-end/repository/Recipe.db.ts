// import database from "../util/database";
// import { Recipe } from "../model/Recipe";

// const getAllRecipes = async (): Promise<Recipe[]> => {
//     const recipePrisma = await database.recipe.findMany({
//         include: {
//             creator: true,
//             ingredients: true, // Adjusted relation name (this is acctually the recipeIngredients relation but is called ingredients in the prisma schema)
//             reviews: true
//         },
//     });

//     if (!recipePrisma || recipePrisma.length === 0) {
//         return [];
//     }

//     return recipePrisma.map((recipePrisma) => Recipe.from(recipePrisma));
// };

// const getRecipeById = async (id: number): Promise<Recipe | null> => {
//     const recipePrisma = await database.recipe.findUnique({
//         where: {
//             id: id,
//         },
//     });

//     if (!recipePrisma) {
//         return null;
//     }

//     return Recipe.from(recipePrisma);
// };

// const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
//     const recipePrisma = await database.recipe.create({
//         data: {
//             name: recipe.name,
//             description: recipe.description,
//             creatorId: recipe.creator.id!, // Use non-null assertion to guarantee creatorId is defined
//             ingredients: {
//                 create: recipe.recipeIngredients.map((ingredient) => ({
//                     amount: ingredient.amount,
//                     measurementType: ingredient.measurementType,
//                     ingredientId: ingredient.ingredientId,
//                 })),
//             },
//         },
//         include: {
//             ingredients: true,
//             creator: true,
//             reviews: true,
//         },
//     });

//     return Recipe.from(recipePrisma);
// };

// export default {
//     getAllRecipes,
//     getRecipeById,
//     createRecipe,
// };

import { Recipe } from '../model/Recipe';
import { User } from '../model/User';

// Sample in-memory array to hold recipes
const recipes: Recipe[] = [
    new Recipe({
        id: 1,
        name: 'Spaghetti Bolognese',
        description: 'A classic Italian dish with pasta and meat sauce.',
        recipeIngredients: [
            {
                amount: 200,
                measurementType: 'grams',
                ingredientId: 1,
                id: 0,
                recipeId: 0,
            },
        ],
        reviews: [],
    }),
];

const getAllRecipes = (): Recipe[] => {
    return recipes;
};

const getRecipeById = (id: number): Recipe => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    if (!recipe) {
        throw new Error(`Recipe with id ${id} not found`);
    }
    return recipe;
};

const createRecipe = (recipe: Recipe): Recipe => {
    const newId = recipes.length > 0 ? (recipes[recipes.length - 1]?.id ?? 0) + 1 : 1;
    const newRecipe = new Recipe({
        id: newId,
        name: recipe.name,
        description: recipe.description,
        creator: recipe.creator, // Assume creator is passed in with the recipe
        recipeIngredients: recipe.recipeIngredients,
        reviews: [],
    });
    recipes.push(newRecipe);
    return newRecipe;
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
};
