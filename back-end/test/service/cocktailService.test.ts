import cocktailService from '../../service/cocktail.service';
import cocktailDb from '../../repository/cocktail.db';
import { Cocktail } from '../../model/cocktail';

jest.mock('../../repository/cocktail.db');

const mockCocktail: Cocktail = new Cocktail({
  id: 1,
  name: 'Mojito',
  description: 'A refreshing cocktail',
  strongness: 5,
  image: 'mojito.jpg',
  authorId: 1
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('getAllCocktails should return all cocktails', async () => {
  (cocktailDb.getAllCocktails as jest.Mock).mockResolvedValue([mockCocktail]);

  const cocktails = await cocktailService.getAllCocktails();
  expect(cocktails).toEqual([mockCocktail]);
  expect(cocktailDb.getAllCocktails).toHaveBeenCalledTimes(1);
});

test('getCocktailById should return a cocktail by id', async () => {
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(mockCocktail);

  const cocktail = await cocktailService.getCocktailById({ id: 1 });
  expect(cocktail).toEqual(mockCocktail);
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(1);
});

test('getCocktailById should throw an error if cocktail not found', async () => {
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(null);

  await expect(cocktailService.getCocktailById({ id: 1 })).rejects.toThrow('Cocktail with id 1 not found');
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(1);
});

test('addCocktail should add a new cocktail', async () => {
  (cocktailDb.addCocktail as jest.Mock).mockResolvedValue(mockCocktail);

  const newCocktail = await cocktailService.addCocktail({
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg',
    authorId: 1
  });
  expect(newCocktail).toEqual(mockCocktail);
  expect(cocktailDb.addCocktail).toHaveBeenCalledWith({
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg',
    authorId: 1
  });
});

test('deleteCocktail should delete a cocktail by id', async () => {
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(mockCocktail);
  (cocktailDb.deleteCocktail as jest.Mock).mockResolvedValue(undefined);

  await cocktailService.deleteCocktail(1);
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(1);
  expect(cocktailDb.deleteCocktail).toHaveBeenCalledWith(1);
});

test('deleteCocktail should throw an error if cocktail not found', async () => {
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(null);

  await expect(cocktailService.deleteCocktail(1)).rejects.toThrow('Cocktail with id 1 not found');
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(1);
});

test('updateCocktail should update a cocktail by id', async () => {
  const updatedCocktail = new Cocktail({
    id: 1,
    name: 'Updated Mojito',
    description: 'An updated refreshing cocktail',
    strongness: 6,
    image: 'updated_mojito.jpg',
    authorId: 1
  });

  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(mockCocktail);
  (cocktailDb.updateCocktail as jest.Mock).mockResolvedValue(updatedCocktail);

  const result = await cocktailService.updateCocktail({
    id: 1,
    name: 'Updated Mojito',
    description: 'An updated refreshing cocktail',
    strongness: 6,
    image: 'updated_mojito.jpg',
    authorId: 1
  });

  expect(result).toEqual(updatedCocktail);
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(1);
  expect(cocktailDb.updateCocktail).toHaveBeenCalledWith({
    id: 1,
    name: 'Updated Mojito',
    description: 'An updated refreshing cocktail',
    strongness: 6,
    image: 'updated_mojito.jpg',
    authorId: 1
  });
});

test('updateCocktail should throw an error if cocktail not found', async () => {
  (cocktailDb.getCocktailById as jest.Mock).mockResolvedValue(null);

  await expect(cocktailService.updateCocktail({
    id: 1,
    name: 'Updated Mojito',
    description: 'An updated refreshing cocktail',
    strongness: 6,
    image: 'updated_mojito.jpg',
    authorId: 1
  })).rejects.toThrow('Cocktail with id 1 not found');
  expect(cocktailDb.getCocktailById).toHaveBeenCalledWith(1);
});