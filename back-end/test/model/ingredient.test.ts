import { Ingredient } from '../../model/ingredient';
import { IngredientCategory } from '../../types';
import { RecipeIngredient } from '../../model/recipeIngredient';

const name1 = 'carrot';
const category1: IngredientCategory = 'Produce';
const store1 = 'Test Store';
const recipes: RecipeIngredient[] = [];
const id = 1;

test('given: valid values for ingredient, when: ingredient is created, then: ingredient is created with those values', () => {
    const ingredient = new Ingredient({
        name: name1,
        category: category1,
        store: store1,
        recipes: recipes,
    });
    expect(ingredient.getName()).toBe(name1);
    expect(ingredient.getCategory()).toBe(category1);
    expect(ingredient.getStore()).toBe(store1);
});

test('given: missing name, when: ingredient is created, then: error is thrown', () => {
    expect(() => {
        new Ingredient({
            name: '',
            category: category1,
            store: store1,
            recipes: recipes,
        });
    }).toThrow('Name is required');
});

test('given: missing category, when: ingredient is created, then: error is thrown', () => {
    expect(() => {
        new Ingredient({
            name: name1,
            category: '' as IngredientCategory,
            store: store1,
            recipes: recipes,
        });
    }).toThrow('Category is required');
});

test('given: invalid id, when: ingredient is created, then: error is thrown', () => {
    expect(() => {
        new Ingredient({
            id: -1,
            name: name1,
            category: category1,
            store: store1,
            recipes: recipes,
        });
    }).toThrow('Invalid id');
});

test('given: valid id, when: ingredient is created, then: ingredient is created with id', () => {
    const ingredient = new Ingredient({
        id: id,
        name: name1,
        category: category1,
        store: store1,
        recipes: recipes,
    });
    expect(ingredient.getId()).toBe(id);
});

test('given: invalid store type, when: ingredient is created, then: error is thrown', () => {
    expect(() => {
        new Ingredient({
            name: name1,
            category: category1,
            store: 123 as unknown as string,
            recipes: recipes,
        });
    }).toThrow('Store must be a string');
});
