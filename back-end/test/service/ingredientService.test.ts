import ingredientService from '../../service/ingredient.service';
import ingredientDb from '../../repository/ingredient.db';
import { Ingredient } from '../../model/ingredient';

jest.mock('../../repository/ingredient.db');

let mockIngredient: Ingredient;

beforeEach(() => {
  mockIngredient = new Ingredient({ id: 1, name: 'Sugar' });
  jest.clearAllMocks();
});

test('givenIngredientsInDatabase_whenGetAllIngredientsIsCalled_thenItReturnsAllIngredients', async () => {
  // given
  const ingredients = [
    new Ingredient({ id: 1, name: 'Sugar' }),
    new Ingredient({ id: 2, name: 'Salt' }),
  ];
  (ingredientDb.getAllIngredients as jest.Mock).mockResolvedValue(ingredients);

  // when
  const result = await ingredientService.getAllIngredients();

  // then
  expect(ingredientDb.getAllIngredients).toHaveBeenCalled();
  expect(result).toEqual(ingredients);
});

test('givenValidIngredientId_whenGetIngredientByIdIsCalled_thenItReturnsTheIngredient', async () => {
  // given
  const id = 1;
  (ingredientDb.getIngredientById as jest.Mock).mockResolvedValue(mockIngredient);

  // when
  const result = await ingredientService.getIngredientById({ id });

  // then
  expect(ingredientDb.getIngredientById).toHaveBeenCalledWith({ id });
  expect(result).toBe(mockIngredient);
});

test('givenInvalidIngredientId_whenGetIngredientByIdIsCalled_thenThrowsError', async () => {
  // given
  const id = 999;
  (ingredientDb.getIngredientById as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(ingredientService.getIngredientById({ id })).rejects.toThrow(`Ingredient with id ${id} not found`);
});

test('givenValidIngredientData_whenAddIngredientIsCalled_thenItAddsAndReturnsTheIngredient', async () => {
  // given
  const newIngredientData = { name: 'Pepper' };
  const newIngredient = new Ingredient({ id: 3, ...newIngredientData });
  (ingredientDb.addIngredient as jest.Mock).mockResolvedValue(newIngredient);

  // when
  const result = await ingredientService.addIngredient(newIngredient);

  // then
  expect(ingredientDb.addIngredient).toHaveBeenCalledWith(newIngredient.getName());
  expect(result).toBe(newIngredient);
});