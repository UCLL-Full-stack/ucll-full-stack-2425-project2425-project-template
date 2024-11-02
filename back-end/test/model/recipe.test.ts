import { Recipe } from '../../model/recipe';
import { RecipeIngredient } from '../../model/recipeIngredient';
import { User } from '../../model/user';
import { Schedule } from '../../model/schedule';
import { Profile } from '../../model/profile';
import { Ingredient } from '../../model/ingredient';
import { RecipeUpdateInput } from '../../types';

describe('Recipe Class', () => {
    let user: User;
    let ingredient: Ingredient;
    let recipeIngredient: RecipeIngredient;
    let schedule: Schedule;

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
            category: 'Pantry',
        });

        recipeIngredient = new RecipeIngredient({
            recipe: {} as Recipe, // Placeholder, will be set later
            ingredient: ingredient,
            unit: 'cups',
            quantity: 2,
        });

        schedule = new Schedule({
            id: 1,
            user: user,
            date: new Date(),
        });
    });

    test('should create a Recipe instance', () => {
        const recipe = new Recipe({
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        expect(recipe.getTitle()).toBe('Pancakes');
        expect(recipe.getInstructions()).toBe('Mix ingredients and cook.');
        expect(recipe.getCookingTime()).toBe(15);
        expect(recipe.getCategory()).toBe('breakfast');
        expect(recipe.getIngredients()).toEqual([recipeIngredient]);
        expect(recipe.getUser()).toBe(user);
    });

    test('should throw an error if title is empty', () => {
        expect(() => {
            new Recipe({
                title: '',
                instructions: 'Mix ingredients and cook.',
                cookingTime: 15,
                category: 'breakfast',
                ingredients: [recipeIngredient],
                user: user,
            });
        }).toThrow('Title cannot be empty');
    });

    test('should update the recipe title', () => {
        const recipe = new Recipe({
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        recipe.setTitle('Waffles');
        expect(recipe.getTitle()).toBe('Waffles');
    });

    test('should validate and set imageUrl', () => {
        const recipe = new Recipe({
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
            imageUrl: 'http://example.com/image.jpg',
        });

        expect(recipe.getImageUrl()).toBe('http://example.com/image.jpg');
    });

    test('should throw an error for invalid imageUrl', () => {
        expect(() => {
            new Recipe({
                title: 'Pancakes',
                instructions: 'Mix ingredients and cook.',
                cookingTime: 15,
                category: 'breakfast',
                ingredients: [recipeIngredient],
                user: user,
                imageUrl: 'invalid-url',
            });
        }).toThrow('Invalid image URL');
    });

    test('should compare two recipes for equality', () => {
        const recipe1 = new Recipe({
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        const recipe2 = new Recipe({
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        expect(recipe1.equals(recipe2)).toBe(true);
    });

    test('should not compare two different recipes as equal', () => {
        const recipe1 = new Recipe({
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        const recipe2 = new Recipe({
            title: 'Waffles',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        expect(recipe1.equals(recipe2)).toBe(false);
    });

    test('should update recipe fields using updateRecipe method', () => {
        const recipe = new Recipe({
            title: 'Pancakes',
            instructions: 'Mix ingredients and cook.',
            cookingTime: 15,
            category: 'breakfast',
            ingredients: [recipeIngredient],
            user: user,
        });

        const updateInput: RecipeUpdateInput = {
            title: 'Waffles',
            instructions: 'Mix ingredients and cook thoroughly.',
            cookingTime: 20,
            category: 'brunch',
            ingredients: [
                {
                    ingredient: ingredient,
                    unit: 'grams',
                    quantity: 300,
                },
            ],
            imageUrl: 'http://example.com/new-image.jpg',
            isFavorite: true,
            notes: 'Delicious with syrup',
            source: 'Grandma\'s recipe',
        };

        recipe.updateRecipe(updateInput);

        expect(recipe.getTitle()).toBe('Waffles');
        expect(recipe.getInstructions()).toBe('Mix ingredients and cook thoroughly.');
        expect(recipe.getCookingTime()).toBe(20);
        expect(recipe.getCategory()).toBe('brunch');
        expect(recipe.getIngredients()?.[0].getUnit()).toBe('grams');
        expect(recipe.getIngredients()?.[0].getQuantity()).toBe(300);
        expect(recipe.getImageUrl()).toBe('http://example.com/new-image.jpg');
        expect(recipe.getIsFavorite()).toBe(true);
        expect(recipe.getNotes()).toBe('Delicious with syrup');
        expect(recipe.getSource()).toBe('Grandma\'s recipe');
    });
});
