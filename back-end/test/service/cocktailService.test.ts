import cocktailService from '../../service/cocktail.service';
import cocktailDb from '../../repository/cocktail.db';
import { Cocktail } from '../../model/cocktail';

jest.mock('../../repository/cocktail.db');

let mockCocktail: Cocktail;

beforeEach(() => {
  mockCocktail = new Cocktail({
    id: 1,
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg'
  });
});

test('givenCocktailsInDatabase_whenGetAllCocktailsIsCalled_thenItReturnsAllCocktails', async () => {
  // given
  const cocktails = [
    new Cocktail({ id: 1, name: 'Mojito', description: 'A refreshing cocktail', strongness: 5, image: 'mojito.jpg' }),
    new Cocktail({ id: 2, name: 'Old Fashioned', description: 'A classic cocktail', strongness: 7, image: 'old-fashioned.jpg' }),
  ];
  (cocktailDb.getAllCocktails as jest.Mock).mockResolvedValue(cocktails);

  // when
  const result = await cocktailService.getAllCocktails();

  // then
  expect(cocktailDb.getAllCocktails).toHaveBeenCalled();
  expect(result).toEqual(cocktails);
});

test('givenAValidCocktailId_whenGetCocktailByIdIsCalled_thenItReturnsTheCocktail', async () => {
  // given
  const id = 1;
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(mockCocktail);

  // when
  const result = await cocktailService.getCocktailById({ id });

  // then
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(id);
  expect(result).toBe(mockCocktail);
});

test('givenAnInvalidCocktailId_whenGetCocktailByIdIsCalled_thenThrowsError', async () => {
  // given
  const id = 999;
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(cocktailService.getCocktailById({ id })).rejects.toThrow(`Cocktail with id ${id} not found`);
});

test('givenValidCocktailData_whenAddCocktailIsCalled_thenItAddsAndReturnsTheCocktail', async () => {
  // given
  const newCocktailData = { name: 'Margarita', description: 'A classic cocktail', strongness: 6, image: 'margarita.jpg' };
  const newCocktail = new Cocktail({ id: 3, ...newCocktailData });
  (cocktailDb.addCocktail as jest.Mock).mockResolvedValue(newCocktail);

  // when
  const result = await cocktailService.addCocktail(newCocktailData);

  // then
  expect(cocktailDb.addCocktail).toHaveBeenCalledWith(newCocktailData);
  expect(result).toBe(newCocktail);
});

test('givenAValidCocktailId_whenDeleteCocktailIsCalled_thenItDeletesTheCocktail', async () => {
  // given
  const id = 1;
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(mockCocktail);
  (cocktailDb.deleteCocktail as jest.Mock).mockResolvedValue(undefined);

  // when
  await cocktailService.deleteCocktail(id);

  // then
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(id);
  expect(cocktailDb.deleteCocktail).toHaveBeenCalledWith(id);
});

test('givenAnInvalidCocktailId_whenDeleteCocktailIsCalled_thenThrowsError', async () => {
  // given
  const id = 999;
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(cocktailService.deleteCocktail(id)).rejects.toThrow(`Cocktail with id ${id} not found`);
});

test('givenValidCocktailData_whenUpdateCocktailIsCalled_thenItUpdatesAndReturnsTheCocktail', async () => {
  // given
  const updatedCocktailData = { id: 1, name: 'Updated Mojito', description: 'An updated refreshing cocktail', strongness: 5, image: 'updated-mojito.jpg' };
  const updatedCocktail = new Cocktail(updatedCocktailData);
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(mockCocktail);
  (cocktailDb.updateCocktail as jest.Mock).mockResolvedValue(updatedCocktail);

  // when
  const result = await cocktailService.updateCocktail(updatedCocktailData);

  // then
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(updatedCocktailData.id);
  expect(cocktailDb.updateCocktail).toHaveBeenCalledWith(updatedCocktailData);
  expect(result).toBe(updatedCocktail);
});

test('givenAnInvalidCocktailId_whenUpdateCocktailIsCalled_thenThrowsError', async () => {
  // given
  const updatedCocktailData = { id: 999, name: 'Updated Mojito', description: 'An updated refreshing cocktail', strongness: 5, image: 'updated-mojito.jpg' };
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(cocktailService.updateCocktail(updatedCocktailData)).rejects.toThrow(`Cocktail with id ${updatedCocktailData.id} not found`);
});