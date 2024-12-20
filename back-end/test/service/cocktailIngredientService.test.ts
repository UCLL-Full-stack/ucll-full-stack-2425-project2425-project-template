import cocktailIngredientService from '../../service/cocktailIngredient.service';
import cocktailIngredientDb from '../../repository/cocktailIngredient.db';
import { CocktailIngredient } from '../../model/cocktailIngredients';

jest.mock('../../repository/cocktailIngredient.db');

let mockCocktailIngredient: CocktailIngredient;

beforeEach(() => {
  mockCocktailIngredient = new CocktailIngredient(1, 101, 201, '50ml');
});

test('givenValidId_whenGetRelationByIdIsCalled_thenReturnsCocktailIngredient', async () => {
  // given
  const id = 1;
  (cocktailIngredientDb.getRelationById as jest.Mock).mockResolvedValue(mockCocktailIngredient);

  // when
  const result = await cocktailIngredientService.getRelationById(id);

  // then
  expect(result).toBe(mockCocktailIngredient);
  expect(cocktailIngredientDb.getRelationById).toHaveBeenCalledWith(id);
});

test('givenInvalidId_whenGetRelationByIdIsCalled_thenThrowsError', async () => {
  // given
  const id = 999;
  (cocktailIngredientDb.getRelationById as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(cocktailIngredientService.getRelationById(id)).rejects.toThrow(`Relation with id ${id} not found`);
});

test('givenNoParams_whenGetAllRelationsIsCalled_thenReturnsAllCocktailIngredients', async () => {
  // given
  const mockRelations = [mockCocktailIngredient];
  (cocktailIngredientDb.getAllRelations as jest.Mock).mockResolvedValue(mockRelations);

  // when
  const result = await cocktailIngredientService.getAllRelations();

  // then
  expect(result).toBe(mockRelations);
  expect(cocktailIngredientDb.getAllRelations).toHaveBeenCalled();
});

test('givenValidCocktailId_whenGetIngredientsByCocktailIdIsCalled_thenReturnsIngredients', async () => {
  // given
  const cocktailId = 101;
  const mockIngredients = [mockCocktailIngredient];
  (cocktailIngredientDb.getIngredientsByCocktailId as jest.Mock).mockResolvedValue(mockIngredients);

  // when
  const result = await cocktailIngredientService.getIngredientsByCocktailId(cocktailId);

  // then
  expect(result).toBe(mockIngredients);
  expect(cocktailIngredientDb.getIngredientsByCocktailId).toHaveBeenCalledWith(cocktailId);
});

test('givenValidIngredientId_whenGetCocktailsByIngredientIdIsCalled_thenReturnsCocktails', async () => {
  // given
  const ingredientId = 201;
  const mockCocktails = [mockCocktailIngredient];
  (cocktailIngredientDb.getCocktailsByIngredientId as jest.Mock).mockResolvedValue(mockCocktails);

  // when
  const result = await cocktailIngredientService.getCocktailsByIngredientId(ingredientId);

  // then
  expect(result).toBe(mockCocktails);
  expect(cocktailIngredientDb.getCocktailsByIngredientId).toHaveBeenCalledWith(ingredientId);
});