import { Recipe } from '../model/recipe';
import scheduleDb from '../repository/schedule.db';

const getScheduledRecipeDetails = (userId: number, date: Date): Recipe[] => {
    const schedule = scheduleDb.getScheduleByUserIdAndDate(userId, date);
    if (!schedule) {
        return [];
    }
    return schedule.getRecipes() || [];
};

// Not fully implemented yet
const updateRecipeDate = (
    userId: number,
    recipeId: number,
    oldDate: Date,
    newDate: Date
): Recipe => {
    const schedule = scheduleDb.getScheduleByUserIdAndDate(userId, oldDate);
    if (!schedule) throw new Error('Schedule not found');

    const recipe = schedule.getRecipes()?.find((recipe) => recipe.getId() === recipeId);
    if (!recipe) throw new Error('Recipe not found');

    schedule.removeRecipe(recipe);
    const newSchedule =
        scheduleDb.getScheduleByUserIdAndDate(userId, newDate) ||
        scheduleDb.createSchedule(userId, newDate); // TO IMPLEMENT-- FUTURE USER STORY
    newSchedule.addRecipe(recipe);

    return recipe;
};

const deleteRecipe = (userId: number, mealId: number, date: Date) => {
    const schedule = scheduleDb.getScheduleByUserIdAndDate(userId, date);
    if (!schedule) throw new Error('Schedule not found');

    const recipe = schedule.getRecipes()?.find((recipe) => recipe.getId() === mealId);
    if (!recipe) throw new Error('Meal not found');
    schedule.removeRecipe(recipe);
};

export default {
    getScheduledRecipeDetails,
    updateRecipeDate,
    deleteRecipe,
};
