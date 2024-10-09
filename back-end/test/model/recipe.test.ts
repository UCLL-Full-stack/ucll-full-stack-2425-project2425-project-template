import { Recipe } from '../../model/recipe';

const title1 = 'pasta carbonara';
const instructions1 = 'text instructions';
const cookingTime1 = 30;
const category1 = 'dinner';

const recipe: Recipe = new Recipe({
    title: title1,
    instructions: instructions1,
    cookingTime: cookingTime1,
    category: category1,
});

test('given: valid values for recipe, when: recipe is created, then: recipe is created with those values', () => {
    expect(recipe.getTitle()).toBe(title1);
    expect(recipe.getInstructions()).toBe(instructions1);
    expect(recipe.getCookingTime()).toBe(cookingTime1);
    expect(recipe.getCategory()).toBe(category1);
});
