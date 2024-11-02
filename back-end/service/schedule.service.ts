import { Recipe } from '../model/recipe';
import scheduleDb from '../repository/schedule.db';
import { RecipeUpdateInput } from '../types';

const getMealDetails = (userId: number, date: Date): Recipe[] => {
    const schedule = scheduleDb.getScheduleByUserIdAndDate(userId, date);
    if (!schedule) {
        return [];
    }
    return schedule.getRecipes() || [];
};

const editMeal = (
    userId: number,
    mealId: number,
    date: Date,
    mealData: RecipeUpdateInput
): Recipe => {
    const schedule = scheduleDb.getScheduleByUserIdAndDate(userId, date);
    if (!schedule) throw new Error('Schedule not found');

    const recipe = schedule.getRecipes()?.find((recipe) => recipe.getId() === mealId);
    if (!recipe) throw new Error('Meal not found');
    recipe.updateRecipe(mealData);
    return recipe;
};

const deleteMeal = (userId: number, mealId: number, date: Date) => {
    const schedule = scheduleDb.getScheduleByUserIdAndDate(userId, date);
    if (!schedule) throw new Error('Schedule not found');

    const recipe = schedule.getRecipes()?.find((recipe) => recipe.getId() === mealId);
    if (!recipe) throw new Error('Meal not found');
    schedule.removeRecipe(recipe);
};

export default { getRecipeDetails: getMealDetails, editRecipe: editMeal, deleteRecipe: deleteMeal };
