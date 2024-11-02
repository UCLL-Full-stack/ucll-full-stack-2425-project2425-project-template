import { Schedule } from '../model/schedule';
import { Ingredient } from '../model/ingredient';
import { IngredientCategory } from '../types';
import { Recipe } from '../model/recipe';
import { RecipeIngredient } from '../model/recipeIngredient';
import recipeDb from './recipe.db';

// Mock User (user1 from recipes)
const user1 = recipeDb.getAllRecipes()[0].getUser();

// Mock Schedules
const schedules: Schedule[] = [
    new Schedule({
        id: 1,
        user: user1,
        date: new Date('2024-11-03'),
        recipes: [recipeDb.getRecipeById({ id: 1 })!, recipeDb.getRecipeById({ id: 2 })!],
    }),
    new Schedule({
        id: 2,
        user: user1,
        date: new Date('2024-11-04'),
        recipes: [recipeDb.getRecipeById({ id: 3 })!],
    }),
];

const getScheduleByUserIdAndDate = (userId: number, date: Date): Schedule | null => {
    return (
        schedules.find(
            (schedule) =>
                schedule.getUser().getId() === userId &&
                schedule.getDate().toDateString() === date.toDateString()
        ) || null
    );
};

// NOT CORRECTLY IMPLEMENTED YET!
const createSchedule = (userId: number, date: Date): Schedule => {
    const newSchedule = new Schedule({
        id: schedules.length + 1,
        user: user1,
        date: date,
        recipes: [],
    });
    schedules.push(newSchedule);
    return newSchedule;
};

export default { getScheduleByUserIdAndDate, createSchedule };
