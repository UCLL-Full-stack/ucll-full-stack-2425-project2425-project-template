import { Ingredient } from '../../model/ingredient';
import { Recipe } from '../../model/recipe';
import { RecipeIngredient } from '../../model/recipeIngredient';
import { Schedule } from '../../model/schedule';
import scheduleDb from '../../repository/schedule.db';
import scheduleService from '../../service/schedule.service';
import { User } from '../../model/user';
import { Profile } from '../../model/profile';

jest.mock('../../repository/schedule.db');

// Mock data
const user1 = new User({
    id: 1,
    username: 'annie',
    password: '@nnie1234',
    profile: new Profile({
        id: 1,
        firstName: 'Anette',
        lastName: 'Hardy',
        email: 'annie@ucll.be',
    }),
});

const ingredient1 = new Ingredient({ id: 1, name: 'Spaghetti', category: 'Pantry' });
const ingredient2 = new Ingredient({ id: 2, name: 'Tomato Sauce', category: 'Pantry' });

const recipe1 = new Recipe({
    id: 1,
    title: 'Spaghetti Bolognese',
    instructions: 'Cook pasta, Prepare sauce, Mix together',
    cookingTime: 30,
    category: 'dinner',
    ingredients: [
        new RecipeIngredient({
            recipe: {} as Recipe,
            ingredient: ingredient1,
            unit: 'g',
            quantity: 200,
        }),
        new RecipeIngredient({
            recipe: {} as Recipe,
            ingredient: ingredient2,
            unit: 'ml',
            quantity: 150,
        }),
    ],
    user: user1,
    imageUrl: 'https://images.unsplash.com/photo-url',
    isFavorite: true,
});

const schedule = new Schedule({
    id: 1,
    user: user1,
    date: new Date('2024-11-03'),
    recipes: [recipe1],
});

const userId = user1.getId() ?? 0;
const date = schedule.getDate();
const newDate = new Date('2024-11-04');
const recipe = recipe1;

// Mock functions
let mockScheduleDbGetScheduleByUserIdAndDate: jest.Mock;
let mockScheduleDbCreateSchedule: jest.Mock;
let mockScheduleDbSaveSchedule: jest.Mock;

beforeEach(() => {
    mockScheduleDbGetScheduleByUserIdAndDate = jest.fn();
    mockScheduleDbCreateSchedule = jest.fn();
    mockScheduleDbSaveSchedule = jest.fn();

    scheduleDb.getScheduleByUserIdAndDate = mockScheduleDbGetScheduleByUserIdAndDate;
    scheduleDb.createSchedule = mockScheduleDbCreateSchedule;
    scheduleDb.saveSchedule = mockScheduleDbSaveSchedule;

    jest.clearAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

// function for tests expecting errors
function expectError(callback: () => Promise<unknown>, errorMsg: string) {
    expect(callback).rejects.toThrow(errorMsg);
}

test('given a schedule exists, when getScheduledRecipeDetails is called, then recipes for that date are returned', () => {
    mockScheduleDbGetScheduleByUserIdAndDate.mockReturnValue(schedule);

    const recipes = scheduleService.getScheduledRecipeDetails(userId, date);

    expect(recipes).toEqual(schedule.getRecipes());
    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledTimes(1);
});

test('given no schedule exists, when getScheduledRecipeDetails is called, then an empty array is returned', () => {
    mockScheduleDbGetScheduleByUserIdAndDate.mockReturnValue(null);

    const recipes = scheduleService.getScheduledRecipeDetails(userId, date);

    expect(recipes).toEqual([]);
    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledTimes(1);
});

test('given a valid update, when updateRecipeDate is called, then recipe is moved to new date and saved', async () => {
    const newSchedule = new Schedule({ id: 2, user: user1, date: newDate, recipes: [] });

    mockScheduleDbGetScheduleByUserIdAndDate.mockImplementation((uid, d) =>
        d.getTime() === date.getTime() ? schedule : newSchedule
    );
    mockScheduleDbCreateSchedule.mockReturnValue(newSchedule);

    const updatedRecipe = await scheduleService.updateRecipeDate(
        userId,
        recipe.getId()!,
        date,
        newDate
    );

    expect(updatedRecipe).toBe(recipe);
    expect(schedule.getRecipes()).not.toContain(recipe);
    expect(newSchedule.getRecipes()).toContain(recipe);
    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, newDate);
    expect(mockScheduleDbSaveSchedule).toHaveBeenCalledTimes(2);
});

test('given no existing schedule for the old date, when updateRecipeDate is called, then an error is thrown', async () => {
    mockScheduleDbGetScheduleByUserIdAndDate.mockReturnValueOnce(null);

    await expectError(
        () => scheduleService.updateRecipeDate(userId, recipe.getId()!, date, newDate),
        'Schedule not found'
    );

    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbSaveSchedule).not.toHaveBeenCalled();
});

test('given recipe does not exist on old date, when updateRecipeDate is called, then an error is thrown', async () => {
    schedule.removeRecipe(recipe);
    mockScheduleDbGetScheduleByUserIdAndDate.mockReturnValueOnce(schedule);

    await expectError(
        () => scheduleService.updateRecipeDate(userId, recipe.getId()!, date, newDate),
        'Recipe not found'
    );

    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbSaveSchedule).not.toHaveBeenCalled();
});

test('given a recipe exists, when deleteScheduledRecipe is called, then recipe is removed and schedule is saved', async () => {
    schedule.addRecipe(recipe);
    mockScheduleDbGetScheduleByUserIdAndDate.mockReturnValue(schedule);

    await scheduleService.deleteScheduledRecipe(userId, recipe.getId()!, date);

    expect(schedule.getRecipes()).not.toContain(recipe);
    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbSaveSchedule).toHaveBeenCalledWith(schedule);
});

test('given no schedule exists, when deleteScheduledRecipe is called, then an error is thrown', async () => {
    mockScheduleDbGetScheduleByUserIdAndDate.mockReturnValueOnce(null);

    await expectError(
        () => scheduleService.deleteScheduledRecipe(userId, recipe.getId()!, date),
        'Schedule not found'
    );

    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbSaveSchedule).not.toHaveBeenCalled();
});

test('given a recipe does not exist in schedule, when deleteScheduledRecipe is called, then an error is thrown', async () => {
    schedule.removeRecipe(recipe);
    mockScheduleDbGetScheduleByUserIdAndDate.mockReturnValue(schedule);

    await expectError(
        () => scheduleService.deleteScheduledRecipe(userId, recipe.getId()!, date),
        'Recipe not found in schedule'
    );

    expect(mockScheduleDbGetScheduleByUserIdAndDate).toHaveBeenCalledWith(userId, date);
    expect(mockScheduleDbSaveSchedule).not.toHaveBeenCalled();
});
