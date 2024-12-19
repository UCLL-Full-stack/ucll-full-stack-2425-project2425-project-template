import recipeService from '../../service/recipe.service';
import recipeDb from '../../repository/recipe.db';
import { Recipe } from '../../model/recipe';
import { RecipeUpdateInput } from '../../types';
import { RecipeIngredient } from '../../model/recipeIngredient';
import { Ingredient } from '../../model/ingredient';
import { User } from '../../model/user';
import { Profile } from '../../model/profile';

jest.mock('../../repository/recipe.db');

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

const recipe1Ingredients = [
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
];

const mockRecipe = new Recipe({
    id: 1,
    title: 'Spaghetti Bolognese',
    instructions: 'Cook pasta, Prepare sauce, Mix together',
    cookingTime: 30,
    category: 'dinner',
    ingredients: recipe1Ingredients,
    user: user1,
    imageUrl: 'https://images.unsplash.com/photo-url',
    isFavorite: true,
});
mockRecipe.updateRecipe = jest.fn();

// mock functions
let mockRecipeDbGetAllRecipes: jest.Mock;
let mockRecipeDbGetRecipeById: jest.Mock;
let mockRecipeDbSaveRecipe: jest.Mock;
let mockRecipeDbDeleteRecipe: jest.Mock;

beforeEach(() => {
    mockRecipeDbGetAllRecipes = jest.fn().mockReturnValue([mockRecipe]);
    mockRecipeDbGetRecipeById = jest.fn().mockReturnValue(mockRecipe);
    mockRecipeDbSaveRecipe = jest.fn();
    mockRecipeDbDeleteRecipe = jest.fn();

    recipeDb.getAllRecipes = mockRecipeDbGetAllRecipes;
    recipeDb.getRecipeById = mockRecipeDbGetRecipeById;
    recipeDb.saveRecipe = mockRecipeDbSaveRecipe;
    recipeDb.deleteRecipe = mockRecipeDbDeleteRecipe;

    jest.clearAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

// function for tests that expect errors
function expectError(callback: () => void, errorMsg: string) {
    expect(callback).toThrow(errorMsg);
}

test('given recipes exist, when getAllRecipes is called, then all recipes are returned', () => {
    const recipes = recipeService.getAllRecipes();

    expect(recipes).toEqual([mockRecipe]);
    expect(mockRecipeDbGetAllRecipes).toHaveBeenCalledTimes(1);
});

test('given a recipe exists, when getRecipeById is called, then the recipe is returned', () => {
    const recipe = recipeService.getRecipeById(1);

    expect(recipe).toEqual(mockRecipe);
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledWith({ id: 1 });
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledTimes(1);
});

test('given a recipe does not exist, when getRecipeById is called, then an error is thrown', () => {
    mockRecipeDbGetRecipeById.mockReturnValueOnce(null);

    expectError(() => recipeService.getRecipeById(1), 'Recipe with id 1 does not exist.');
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledWith({ id: 1 });
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledTimes(1);
});

test('given a recipe exists, when updateRecipe is called with valid data, then the recipe is updated and returned', () => {
    const recipeData: RecipeUpdateInput = { title: 'Updated Pasta' };

    const updatedRecipe = recipeService.updateRecipe(1, recipeData);

    expect(mockRecipe.updateRecipe).toHaveBeenCalledWith(recipeData);
    expect(mockRecipeDbSaveRecipe).toHaveBeenCalledWith(mockRecipe);
    expect(updatedRecipe).toEqual(mockRecipe);
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledWith({ id: 1 });
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledTimes(1);
});

test('given invalid or partial data, when updateRecipe is called, then the recipe is handled appropriately', () => {
    const invalidData: RecipeUpdateInput = { title: '' };
    const partialData: RecipeUpdateInput = { cookingTime: 45 };

    // Invalid data
    expectError(() => recipeService.updateRecipe(1, invalidData), 'Invalid title');
    expect(mockRecipe.updateRecipe).not.toHaveBeenCalled();
    expect(mockRecipeDbSaveRecipe).not.toHaveBeenCalled();

    // Partial data
    const updatedRecipe = recipeService.updateRecipe(1, partialData);
    expect(mockRecipe.updateRecipe).toHaveBeenCalledWith(partialData);
    expect(mockRecipeDbSaveRecipe).toHaveBeenCalledWith(mockRecipe);
    expect(updatedRecipe).toEqual(mockRecipe);
});

test('given a recipe exists, when deleteRecipe is called, then the recipe is deleted', () => {
    recipeService.deleteRecipe(1);

    expect(mockRecipeDbDeleteRecipe).toHaveBeenCalledWith({ id: 1 });
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledWith({ id: 1 });
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledTimes(1);
});

test('given a recipe does not exist, when deleteRecipe is called, then an error is thrown', () => {
    mockRecipeDbGetRecipeById.mockReturnValueOnce(null);

    expectError(() => recipeService.deleteRecipe(1), 'Recipe with id 1 does not exist.');
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledWith({ id: 1 });
    expect(mockRecipeDbGetRecipeById).toHaveBeenCalledTimes(1);
});

test('given an invalid ID, when deleteRecipe is called, then an error is thrown', () => {
    expectError(() => recipeService.deleteRecipe(-1), 'Invalid recipe ID');
    expect(mockRecipeDbDeleteRecipe).not.toHaveBeenCalled();
    expect(mockRecipeDbGetRecipeById).not.toHaveBeenCalled();
});

test('given no recipes exist, when getAllRecipes is called, then an empty array is returned', () => {
    mockRecipeDbGetAllRecipes.mockReturnValueOnce([]);

    const recipes = recipeService.getAllRecipes();

    expect(recipes).toEqual([]);
    expect(mockRecipeDbGetAllRecipes).toHaveBeenCalledTimes(1);
});
