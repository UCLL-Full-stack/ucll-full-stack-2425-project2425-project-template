import { Schedule } from '../model/schedule';
import { User } from '../model/user';
import { Profile } from '../model/profile';
import { Ingredient } from '../model/ingredient';
import { IngredientCategory } from '../types';
import { Recipe } from '../model/recipe';
import { RecipeIngredient } from '../model/recipeIngredient';

// Mock user
const user1 = new User({
    id: 1,
    username: 'annie',
    password: '@nnie1234',
    profile: new Profile({
        id: 1,
        firstName: 'Anette',
        lastName: 'Hardy',
        email: 'annie@ucll.be',
        user: undefined,
    }),
});

// Mock Ingredients
const ingredient1 = new Ingredient({
    id: 1,
    name: 'Spaghetti',
    category: 'Pantry' as IngredientCategory,
    recipes: [],
});
const ingredient2 = new Ingredient({
    id: 2,
    name: 'Tomato Sauce',
    category: 'Pantry' as IngredientCategory,
    recipes: [],
});

// Mock Recipe
const recipe1 = new Recipe({
    id: 1,
    title: 'Spaghetti Bolognese',
    instructions: 'Cook pasta, prepare sauce, mix together.',
    cookingTime: 30,
    category: 'Dinner',
    ingredients: [
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient1,
            unit: 'g',
            quantity: 200,
        }),
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient2,
            unit: 'ml',
            quantity: 150,
        }),
    ],
    user: user1,
});
recipe1.getIngredients()?.forEach((ingredient) => {
    ingredient.setRecipe(recipe1);
}); // Set recipe references in ingredients

// Mock schedule
const schedule1 = new Schedule({
    id: 1,
    user: user1,
    date: new Date('2024-11-03'),
    recipes: [recipe1],
});
const schedules: Schedule[] = [schedule1]; // Add schedules to the mock data array

const getScheduleByUserIdAndDate = (userId: number, date: Date): Schedule | null => {
    return (
        schedules.find(
            (schedule) =>
                schedule.getUser().getId() === userId &&
                schedule.getDate().toDateString() === date.toDateString()
        ) || null
    );
};

export default { getScheduleByUserIdAndDate };
