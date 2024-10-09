import { Ingredient } from '../../model/ingredient';

const name1 = 'carrot';
const category1 = 'Vegetables';
const store1 = 'Test Store';
const ingredient: Ingredient = new Ingredient({
    name: name1,
    category: category1,
    store: store1,
});

test('given: valid values for ingredient, when: ingredient is created, then: ingredient is created with those values', () => {
    expect(ingredient.getName()).toBe(name1);
    expect(ingredient.getCategory()).toBe(category1);
    expect(ingredient.getStore()).toBe(store1);
});
