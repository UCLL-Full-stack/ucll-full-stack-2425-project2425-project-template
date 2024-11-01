import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { Recipe } from '../../model/recipe';
import { Schedule } from '../../model/schedule';
import { Ingredient } from '../../model/ingredient';
import { RecipeIngredient } from '../../model/recipeIngredient';
import { IngredientCategory } from '../../types';

describe('User Class', () => {
    let profile: Profile;
    let user: User;
    let recipe: Recipe;
    let schedule: Schedule;
    let ingredient: Ingredient;
    let recipeIngredient: RecipeIngredient;

    beforeEach(() => {
        profile = new Profile({
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
            category: 'Breakfast',
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

    test('should create a User instance', () => {
        expect(user.getId()).toBe(1);
        expect(user.getUsername()).toBe('testuser');
        expect(user.getPassword()).toBe('password');
        expect(user.getProfile()).toBe(profile);
        expect(user.getRecipes()).toEqual([]);
        expect(user.getSchedule()).toBeUndefined();
    });

    test('should throw an error if username is missing', () => {
        expect(() => {
            new User({
                id: 1,
                username: '',
                password: 'password',
                profile: profile,
            });
        }).toThrow('Username is required and cannot be empty');
    });

    test('should throw an error if password is missing', () => {
        expect(() => {
            new User({
                id: 1,
                username: 'testuser',
                password: '',
                profile: profile,
            });
        }).toThrow('Password is required and cannot be empty');
    });

    test('should throw an error if profile is missing', () => {
        expect(() => {
            new User({
                id: 1,
                username: 'testuser',
                password: 'password',
                profile: undefined as unknown as Profile,
            });
        }).toThrow('Profile is required');
    });

    test('should add a recipe to the user', () => {
        user.addRecipe(recipe);
        expect(user.getRecipes()).toContain(recipe);
    });

    test('should set and get schedule for the user', () => {
        user.setSchedule(schedule);
        expect(user.getSchedule()).toBe(schedule);
    });

    test('should compare two users for equality', () => {
        const anotherUser = new User({
            id: 2,
            username: 'testuser',
            password: 'password',
            profile: profile,
        });

        expect(user.equals(anotherUser)).toBe(true);
    });

    test('should not compare two different users as equal', () => {
        const anotherUser = new User({
            id: 2,
            username: 'differentuser',
            password: 'differentpassword',
            profile: profile,
        });

        expect(user.equals(anotherUser)).toBe(false);
    });
});