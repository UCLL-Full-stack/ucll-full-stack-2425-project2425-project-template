import { Recipe } from '../../model/recipe';
import { Schedule } from '../../model/schedule';
import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { Ingredient } from '../../model/ingredient';
import { RecipeIngredient } from '../../model/recipeIngredient';
import { IngredientCategory } from '../../types';

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
    category: 'Pantry' as IngredientCategory,
});

const recipeIngredient = new RecipeIngredient({
    recipe: {} as Recipe,
    ingredient: ingredient,
    unit: 'cups',
    quantity: 2,
});

const recipe = new Recipe({
    id: 1,
    title: 'Pancakes',
    instructions: 'Mix ingredients and cook.',
    cookingTime: 15,
    category: 'breakfast',
    ingredients: [recipeIngredient],
    user: user,
});

const schedule = new Schedule({
    id: 1,
    user: user,
    date: new Date(),
    recipes: [recipe],
});

test('given: valid values for schedule, when: schedule is created, then: schedule is created with those values', () => {
    expect(schedule.getId()).toBe(1);
    expect(schedule.getUser()).toBe(user);
    expect(schedule.getDate()).toBeInstanceOf(Date);
    expect(schedule.getRecipes()).toEqual([recipe]);
});

test('given: missing user, when: schedule is created, then: error is thrown', () => {
    expect(() => {
        new Schedule({
            id: 1,
            user: undefined as unknown as User,
            date: new Date(),
            recipes: [recipe],
        });
    }).toThrow('User is required');
});

test('given: invalid date, when: schedule is created, then: error is thrown', () => {
    expect(() => {
        new Schedule({
            id: 1,
            user: user,
            date: 'invalid-date' as unknown as Date,
            recipes: [recipe],
        });
    }).toThrow('Date must be a valid Date object');
});

test('given: new recipe, when: recipe is added to schedule, then: recipe is added', () => {
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

test('given: duplicate recipe, when: recipe is added to schedule, then: error is thrown', () => {
    expect(() => {
        schedule.addRecipe(recipe);
    }).toThrow(`A recipe with the name "${recipe.getTitle()}" is already scheduled for this date`);
});

test('given: existing recipe, when: recipe is removed from schedule, then: recipe is removed', () => {
    schedule.removeRecipe(recipe);
    expect(schedule.getRecipes()).not.toContain(recipe);
});

test('given: existing recipe, when: checking if recipe is in schedule, then: returns true', () => {
    schedule.addRecipe(recipe);
    expect(schedule.hasRecipe(recipe)).toBe(true);
});

test('given: new recipe, when: checking if recipe is in schedule, then: returns false', () => {
    const newSchedule = new Schedule({
        id: 2,
        user: user,
        date: new Date(),
        recipes: [],
    });

    const newRecipe = new Recipe({
        id: 2,
        title: 'Waffles',
        instructions: 'Mix ingredients and cook.',
        cookingTime: 20,
        category: 'breakfast',
        ingredients: [recipeIngredient],
        user: user,
    });

    expect(newSchedule.hasRecipe(newRecipe)).toBe(false);
});
