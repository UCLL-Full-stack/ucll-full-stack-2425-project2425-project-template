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
        const id = cocktailIngredient.getId();
        const cocktailId = cocktailIngredient.getCocktailId();
        const ingredientId = cocktailIngredient.getIngredientId();
        const amount = cocktailIngredient.getAmount();

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
        cocktailIngredient.setId(newId);

        // then
        expect(cocktailIngredient.getId()).toBe(newId);
    });

    test('givenANewCocktailId_whenSetCocktailIdIsCalled_thenTheCocktailIdIsUpdated', () => {
        // given
        const newCocktailId = 102;

        // when
        cocktailIngredient.setCocktailId(newCocktailId);

        // then
        expect(cocktailIngredient.getCocktailId()).toBe(newCocktailId);
    });

    test('givenANewIngredientId_whenSetIngredientIdIsCalled_thenTheIngredientIdIsUpdated', () => {
        // given
        const newIngredientId = 203;

        // when
        cocktailIngredient.setIngredientId(newIngredientId);

        // then
        expect(cocktailIngredient.getIngredientId()).toBe(newIngredientId);
    });

    test('givenANewAmount_whenSetAmountIsCalled_thenTheAmountIsUpdated', () => {
        // given
        const newAmount = '100ml';

        // when
        cocktailIngredient.setAmount(newAmount);

        // then
        expect(cocktailIngredient.getAmount()).toBe(newAmount);
    });
});