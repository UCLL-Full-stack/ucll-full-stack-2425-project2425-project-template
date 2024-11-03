import { Ingredient } from "../../model/ingredient";
import ingredientDb from "../../repository/ingredient.db";
import ingredientService from "../../service/ingredient.service";


let mockGetAllIngredients: jest.Mock;
let mockGetIngredientById: jest.Mock;
let mockAddIngredient: jest.Mock;

beforeEach(() => {
    mockGetAllIngredients = jest.fn();
    mockGetIngredientById = jest.fn();
    mockAddIngredient = jest.fn();

    ingredientDb.getAllIngredients = mockGetAllIngredients;
    ingredientDb.getIngredientById = mockGetIngredientById;
    ingredientDb.addIngredient = mockAddIngredient;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenIngredientsInDatabase_whenGetAllIngredientsIsCalled_thenItReturnsAllIngredients', () => {
    // given
    const ingredients = [
        new Ingredient(1, 'Sugar'),
        new Ingredient(2, 'Salt'),
    ];
    mockGetAllIngredients.mockReturnValue(ingredients);

    // when
    const result = ingredientService.getAllIngredients();

    // then
    expect(mockGetAllIngredients).toHaveBeenCalled();
    expect(result).toEqual(ingredients);
});

test('givenValidIngredientId_whenGetIngredientByIdIsCalled_thenItReturnsTheIngredient', () => {
    // given
    const ingredient = new Ingredient(1, 'Sugar');
    mockGetIngredientById.mockReturnValue(ingredient);

    // when
    const result = ingredientService.getIngredientById({ id: 1 });

    // then
    expect(mockGetIngredientById).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(ingredient);
});

test('givenInvalidIngredientId_whenGetIngredientByIdIsCalled_thenItThrowsAnError', () => {
    // given
    mockGetIngredientById.mockReturnValue(null);

    // when
    const callWithInvalidId = () => ingredientService.getIngredientById({ id: 999 });

    // then
    expect(callWithInvalidId).toThrowError('Ingredient with id 999 not found');
    expect(mockGetIngredientById).toHaveBeenCalledWith({ id: 999 });
});

test('givenValidIngredientName_whenAddIngredientIsCalled_thenItAddsAndReturnsTheIngredient', () => {
    // given
    const ingredientName = 'Pepper';
    const addedIngredient = new Ingredient(3, 'Pepper');
    mockAddIngredient.mockReturnValue(addedIngredient);

    // when
    const result = ingredientService.addIngredient(ingredientName);

    // then
    expect(mockAddIngredient).toHaveBeenCalledWith(new Ingredient(0, ingredientName));
    expect(result).toEqual(addedIngredient);
});
