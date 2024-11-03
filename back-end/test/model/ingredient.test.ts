import { Ingredient } from "../../model/ingredient";

describe('Ingredient Class', () => {
    let ingredient: Ingredient;

    beforeEach(() => {
        // Initialize a new ingredient before each test
        ingredient = new Ingredient(1, 'Sugar');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('givenAnIngredient_whenCreated_thenItHasCorrectProperties', () => {
        // when
        const id = ingredient.getId();
        const name = ingredient.getName();

        // then
        expect(id).toBe(1);
        expect(name).toBe('Sugar');
    });

    test('givenANewName_whenSetNameIsCalled_thenTheNameIsUpdated', () => {
        // given
        const newName = 'Brown Sugar';

        // when
        ingredient.setName(newName);
        const updatedName = ingredient.getName();

        // then
        expect(updatedName).toBe(newName);
    });

    test('givenTwoEqualIngredients_whenEqualsIsCalled_thenItReturnsTrue', () => {
        // given
        const otherIngredient = new Ingredient(1, 'Sugar');

        // when
        const result = ingredient.equals(otherIngredient);

        // then
        expect(result).toBe(true);
    });

    test('givenTwoDifferentIngredients_whenEqualsIsCalled_thenItReturnsFalse', () => {
        // given
        const otherIngredient = new Ingredient(2, 'Salt');

        // when
        const result = ingredient.equals(otherIngredient);

        // then
        expect(result).toBe(false);
    });
});
