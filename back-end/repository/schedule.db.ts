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
const ingredient3 = new Ingredient({
    id: 3,
    name: 'Chicken Breast',
    category: 'Meat & Fish' as IngredientCategory,
    recipes: [],
});
const ingredient4 = new Ingredient({
    id: 4,
    name: 'Lettuce',
    category: 'Produce' as IngredientCategory,
    recipes: [],
});

// Mock Recipes
const recipe1 = new Recipe({
    id: 1,
    title: 'Spaghetti Bolognese',
    instructions: 'Cook pasta, prepare sauce, mix together.',
    cookingTime: 30,
    category: 'dinner',
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
    imageUrl:
        'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isFavorite: true,
});

const recipe2 = new Recipe({
    id: 2,
    title: 'Chicken Salad',
    instructions: 'Grill chicken, chop lettuce, mix together.',
    cookingTime: 20,
    category: 'lunch',
    ingredients: [
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient3,
            unit: 'g',
            quantity: 150,
        }),
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient4,
            unit: 'g',
            quantity: 100,
        }),
    ],
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isFavorite: false,
});

recipe1.getIngredients()?.forEach((ingredient) => {
    ingredient.setRecipe(recipe1);
});
recipe2.getIngredients()?.forEach((ingredient) => {
    ingredient.setRecipe(recipe2);
});

// Mock schedules
const schedule1 = new Schedule({
    id: 1,
    user: user1,
    date: new Date('2024-11-03'),
    recipes: [recipe1, recipe2],
});

const recipe3 = new Recipe({
    id: 3,
    title: 'Grilled Cheese Sandwich',
    instructions:
        'Grill cheese between slices of bread, Butter the outside of the bread, Heat a skillet over medium heat, Cook until golden brown on both sides',
    cookingTime: 10,
    category: 'lunch',
    ingredients: [
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient1,
            unit: 'slices',
            quantity: 2,
        }),
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient2,
            unit: 'slices',
            quantity: 2,
        }),
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient3,
            unit: 'tablespoons',
            quantity: 1,
        }),
        new RecipeIngredient({
            recipe: null as unknown as Recipe,
            ingredient: ingredient4,
            unit: 'tablespoons',
            quantity: 1,
        }),
    ],
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
    isFavorite: true,
    notes: 'Make sure to use fresh bread for the best taste. You can add tomatoes or ham for extra flavor.',
    source: 'https://www.example.com/grilled-cheese-sandwich-recipe',
});

recipe3.getIngredients()?.forEach((ingredient) => {
    ingredient.setRecipe(recipe3);
});

const schedule2 = new Schedule({
    id: 2,
    user: user1,
    date: new Date('2024-11-04'),
    recipes: [recipe3],
});

const schedules: Schedule[] = [schedule1, schedule2]; // Add schedules to the mock data array

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
