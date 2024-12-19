import { Recipe } from '../model/recipe';
import recipeDb from '../repository/recipe.db';
import scheduleDb from '../repository/schedule.db';

const getScheduledRecipeDetails = async (userId: number, date: Date): Promise<Recipe[]> => {
    const schedule = await scheduleDb.getScheduledRecipesByUserIdAndDate(userId, date);
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
    const oldSchedule = await scheduleDb.getScheduledRecipesByUserIdAndDate(userId, oldDate);
    if (!oldSchedule) throw new Error('Schedule not found');

    const recipe = oldSchedule.getRecipes()?.find((recipe) => recipe.getId() === recipeId);
    if (!recipe) throw new Error('Recipe not found');

    const oldScheduleId = oldSchedule.getId();
    if (oldScheduleId === undefined) throw new Error('Old schedule ID is undefined');

    await scheduleDb.removeScheduledRecipe(oldScheduleId, recipeId);
    const newSchedule =
        (await scheduleDb.getScheduledRecipesByUserIdAndDate(userId, newDate)) ||
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
    const schedule = await scheduleDb.getScheduledRecipesByUserIdAndDate(userId, date);
    if (!schedule) throw new Error('Schedule not found');

    const recipe = schedule.getRecipes()?.find((recipe) => recipe.getId() === recipeId);
    if (!recipe) throw new Error('Recipe not found in schedule');

    const scheduleId = schedule.getId();
    if (scheduleId === undefined) throw new Error('Schedule ID is undefined');

    await scheduleDb.removeScheduledRecipe(scheduleId, recipeId);

    // Update the recipe's scheduledDate to null
    recipe.setScheduledDate(null);
    await recipeDb.saveRecipe(recipe, userId);
};

export default {
    getScheduledRecipeDetails,
    updateRecipeDate,
    deleteScheduledRecipe,
};
