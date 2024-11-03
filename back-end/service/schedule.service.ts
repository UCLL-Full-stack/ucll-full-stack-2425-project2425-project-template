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
const updateRecipeDate = async (
    userId: number,
    recipeId: number,
    oldDate: Date,
    newDate: Date
): Promise<Recipe> => {
    const oldSchedule = await scheduleDb.getScheduleByUserIdAndDate(userId, oldDate);
    if (!oldSchedule) throw new Error('Schedule not found');

    const recipe = oldSchedule.getRecipes()?.find((recipe) => recipe.getId() === recipeId);
    if (!recipe) throw new Error('Recipe not found');

    oldSchedule.removeRecipe(recipe);
    const newSchedule =
        (await scheduleDb.getScheduleByUserIdAndDate(userId, newDate)) ||
        (await scheduleDb.createSchedule(userId, newDate));
    newSchedule.addRecipe(recipe);

    await scheduleDb.saveSchedule(oldSchedule);
    await scheduleDb.saveSchedule(newSchedule);

    return recipe;
};

const deleteScheduledRecipe = async (
    userId: number,
    recipeId: number,
    date: Date
): Promise<void> => {
    const schedule = await scheduleDb.getScheduleByUserIdAndDate(userId, date);
    if (!schedule) throw new Error('Schedule not found');

    const recipe = schedule.getRecipes()?.find((recipe) => recipe.getId() === recipeId);
    if (!recipe) throw new Error('Recipe not found in schedule');

    schedule.removeRecipe(recipe);
    await scheduleDb.saveSchedule(schedule);
};

export default {
    getScheduledRecipeDetails,
    updateRecipeDate,
    deleteScheduledRecipe,
};
