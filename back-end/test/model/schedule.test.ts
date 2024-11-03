import { Recipe } from '../../model/recipe';
import { Schedule } from '../../model/schedule';
import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { Ingredient } from '../../model/ingredient';
import { RecipeIngredient } from '../../model/recipeIngredient';
import { IngredientCategory } from '../../types';

describe('Schedule Class', () => {
    let user: User;
    let recipe: Recipe;
    let schedule: Schedule;
    let ingredient: Ingredient;
    let recipeIngredient: RecipeIngredient;

    beforeEach(() => {
        const profile = new Profile({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
        });

        user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: profile,
        });

        ingredient = new Ingredient({
            id: 1,
            name: 'Flour',
            category: 'Pantry' as IngredientCategory,
        });

        recipeIngredient = new RecipeIngredient({
            recipe: {} as Recipe, // Placeholder, will be set later
            ingredient: ingredient,
            unit: 'cups',
            quantity: 2,
        });

        recipe = new Recipe({
            id: 1,
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        schedule = new Schedule({
            id: 1,
            user: user,
            date: new Date(),
            recipes: [recipe],
        });
    });

    test('should create a Schedule instance', () => {
        expect(schedule.getId()).toBe(1);
        expect(schedule.getUser()).toBe(user);
        expect(schedule.getDate()).toBeInstanceOf(Date);
        expect(schedule.getRecipes()).toEqual([recipe]);
    });

    test('should throw an error if user is missing', () => {
        expect(() => {
            new Schedule({
                id: 1,
                user: undefined as unknown as User,
                date: new Date(),
                recipes: [recipe],
            });
        }).toThrow('User is required');
    });

    test('should throw an error if date is invalid', () => {
        expect(() => {
            new Schedule({
                id: 1,
                user: user,
                date: 'invalid-date' as unknown as Date,
                recipes: [recipe],
            });
        }).toThrow('Date must be a valid Date object');
    });

    test('should add a recipe to the schedule', () => {
        const newRecipe = new Recipe({
            id: 2,
            title: 'Waffles',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 20,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        schedule.addRecipe(newRecipe);
        expect(schedule.getRecipes()).toContain(newRecipe);
    });

    test('should throw an error if adding a duplicate recipe', () => {
        expect(() => {
            schedule.addRecipe(recipe);
        }).toThrow(
            `A recipe with the name "${recipe.getTitle()}" is already scheduled for this date`
        );
    });

    test('should remove a recipe from the schedule', () => {
        schedule.removeRecipe(recipe);
        expect(schedule.getRecipes()).not.toContain(recipe);
    });

    test('should check if a recipe is in the schedule', () => {
        expect(schedule.hasRecipe(recipe)).toBe(true);

        const newRecipe = new Recipe({
            id: 2,
            title: 'Waffles',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 20,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        expect(schedule.hasRecipe(newRecipe)).toBe(false);
    });
});
