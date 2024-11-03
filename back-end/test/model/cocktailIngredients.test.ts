import { CocktailIngredient } from "../../model/cocktailIngredients";

describe('CocktailIngredient Class', () => {
    let cocktailIngredient: CocktailIngredient;

    beforeEach(() => {
        // Initialize a new CocktailIngredient before each test
        cocktailIngredient = new CocktailIngredient(1, 101, 202, '50ml');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('givenACocktailIngredient_whenCreated_thenItHasCorrectProperties', () => {
        // when
        const id = cocktailIngredient.id;
        const cocktailId = cocktailIngredient.cocktailId;
        const ingredientId = cocktailIngredient.ingredientId;
        const amount = cocktailIngredient.amount;

        // then
        expect(id).toBe(1);
        expect(cocktailId).toBe(101);
        expect(ingredientId).toBe(202);
        expect(amount).toBe('50ml');
    });

    test('givenANewId_whenSetIdIsCalled_thenTheIdIsUpdated', () => {
        // given
        const newId = 2;

        // when
        cocktailIngredient.id = newId;

        // then
        expect(cocktailIngredient.id).toBe(newId);
    });

    test('givenANewCocktailId_whenSetCocktailIdIsCalled_thenTheCocktailIdIsUpdated', () => {
        // given
        const newCocktailId = 102;

        // when
        cocktailIngredient.cocktailId = newCocktailId;

        // then
        expect(cocktailIngredient.cocktailId).toBe(newCocktailId);
    });

    test('givenANewIngredientId_whenSetIngredientIdIsCalled_thenTheIngredientIdIsUpdated', () => {
        // given
        const newIngredientId = 203;

        // when
        cocktailIngredient.ingredientId = newIngredientId;

        // then
        expect(cocktailIngredient.ingredientId).toBe(newIngredientId);
    });

    test('givenANewAmount_whenSetAmountIsCalled_thenTheAmountIsUpdated', () => {
        // given
        const newAmount = '100ml';

        // when
        cocktailIngredient.amount = newAmount;

        // then
        expect(cocktailIngredient.amount).toBe(newAmount);
    });
});
