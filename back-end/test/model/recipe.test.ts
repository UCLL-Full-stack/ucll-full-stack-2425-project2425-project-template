import { Recipe } from '../../model/recipe';
import { RecipeIngredient } from '../../model/recipeIngredient';
import { User } from '../../model/user';
import { Schedule } from '../../model/schedule';
import { Profile } from '../../model/profile';
import { Ingredient } from '../../model/ingredient';
import { RecipeUpdateInput } from '../../types';

const profile = new Profile({
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
});

const user = new User({
    id: 1,
    username: 'testuser',
    password: 'password',
    profile: profile,
});

const ingredient = new Ingredient({
    id: 1,
    name: 'Flour',
    category: 'Pantry',
});

const recipeIngredient = new RecipeIngredient({
    recipe: {} as Recipe,
    ingredient: ingredient,
    unit: 'cups',
    quantity: 2,
});

const schedule = new Schedule({
    id: 1,
    user: user,
    date: new Date(),
});

test('given: valid values for recipe, when: recipe is created, then: recipe is created with those values', () => {
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

test('given: empty title, when: recipe is created, then: error is thrown', () => {
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

test('given: valid title, when: title is updated, then: title is updated with new value', () => {
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

test('given: valid imageUrl, when: recipe is created, then: recipe is created with imageUrl', () => {
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

test('given: invalid imageUrl, when: recipe is created, then: error is thrown', () => {
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

test('given: two identical recipes, when: compared, then: they are equal', () => {
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

test('given: two different recipes, when: compared, then: they are not equal', () => {
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

test('given: valid update input, when: recipe is updated, then: recipe fields are updated', () => {
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
        category: 'Brunch',
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
        source: "Grandma's recipe",
    };

    recipe.updateRecipe(updateInput);

    expect(recipe.getTitle()).toBe('Waffles');
    expect(recipe.getInstructions()).toBe('Mix ingredients and cook thoroughly.');
    expect(recipe.getCookingTime()).toBe(20);
    expect(recipe.getCategory()).toBe('Brunch');
    expect(recipe.getIngredients()?.[0].getUnit()).toBe('grams');
    expect(recipe.getIngredients()?.[0].getQuantity()).toBe(300);
    expect(recipe.getImageUrl()).toBe('http://example.com/new-image.jpg');
    expect(recipe.getIsFavorite()).toBe(true);
    expect(recipe.getNotes()).toBe('Delicious with syrup');
    expect(recipe.getSource()).toBe("Grandma's recipe");
});
