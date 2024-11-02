import { Ingredient } from '../../model/Ingredient';

test('given valid ingredient data, when an Ingredient is created, then properties are correctly assigned', () => {
    // given
    const name = 'Sugar';
    const category = 'Sweetener';

    // when
    const ingredient = new Ingredient(name, category);

    // then
    expect(ingredient.name).toBe(name);
    expect(ingredient.category).toBe(category);
});

test('given two ingredients with the same name and category, when compared, then equals() returns true', () => {
    // given
    const ingredient1 = new Ingredient('Salt', 'Spice');
    const ingredient2 = new Ingredient('Salt', 'Spice');

    // then
    expect(ingredient1.equals(ingredient2)).toBe(true);
});

test('given two ingredients with different names or categories, when compared, then equals() returns false', () => {
    // given
    const ingredient1 = new Ingredient('Sugar', 'Sweetener');
    const ingredient2 = new Ingredient('Salt', 'Spice');

    // then
    expect(ingredient1.equals(ingredient2)).toBe(false);
});
