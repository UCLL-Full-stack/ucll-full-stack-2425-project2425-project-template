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

    oldSchedule.removeRecipe(recipe);
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

    schedule.removeRecipe(recipe);
    await scheduleDb.saveSchedule(schedule);

    // Update the recipe's scheduledDate to null
    recipe.setScheduledDate(null);
    await recipeDb.saveRecipe(recipe, userId);
};

export default {
    getScheduledRecipeDetails,
    updateRecipeDate,
    deleteScheduledRecipe,
};
