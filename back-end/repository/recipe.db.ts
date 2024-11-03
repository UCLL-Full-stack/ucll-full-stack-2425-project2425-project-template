import { scheduler } from "timers/promises";
import { Recipe } from "../model/recipe";
import { User } from "../model/user";

const recipes = [
    new Recipe({
        recipeId: 1,
        user: new User({
            id: undefined,
            username: '@BobHope',
            firstName: 'Bob',
            lastName: 'Hope',
            email: 'bobhope@gmail.com',
            password: 'bob123',
            role: 'user',
        }),
        title: 'spaghetti',
        description: 'A delicious spaghetti recipe.',
        instructions: '1. Boil water. 2. Cook pasta. 3. Prepare sauce. 4. Mix pasta and sauce.',
        nutritionFacts: 'Calories: 200, Protein: 7g, Carbs: 30g, Fat: 5g',
        cookingTips: 'Use fresh tomatoes for the sauce.',
        extraNotes: 'Can be stored in the fridge for up to 3 days.',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-02T00:00:00Z'),
        tags: []
    })
]

const getAllRecipes = async (): Promise<Recipe[]> => {
    return recipes;
}

const createRecipe = (recipe: Recipe): void => {
    recipes.push(recipe);
}

export default {
    getAllRecipes,
    createRecipe,
}