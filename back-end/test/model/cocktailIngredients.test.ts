import { CocktailIngredient } from '../../model/cocktailIngredients';

let cocktailIngredient: CocktailIngredient;

beforeEach(() => {
  cocktailIngredient = new CocktailIngredient(1, 101, 201, '50ml');
});

test('givenValidProperties_whenConstructorIsCalled_thenPropertiesAreInitializedCorrectly', () => {
  expect(cocktailIngredient.getId()).toBe(1);
  expect(cocktailIngredient.getCocktailId()).toBe(101);
  expect(cocktailIngredient.getIngredientId()).toBe(201);
  expect(cocktailIngredient.getAmount()).toBe('50ml');
});

test('givenCocktailIngredientInstance_whenGettersAreCalled_thenReturnCorrectValues', () => {
  expect(cocktailIngredient.getId()).toBe(1);
  expect(cocktailIngredient.getCocktailId()).toBe(101);
  expect(cocktailIngredient.getIngredientId()).toBe(201);
  expect(cocktailIngredient.getAmount()).toBe('50ml');
});

test('givenCocktailIngredientInstance_whenSettersAreCalled_thenPropertiesAreUpdatedCorrectly', () => {
  cocktailIngredient.setId(2);
  cocktailIngredient.setCocktailId(102);
  cocktailIngredient.setIngredientId(202);
  cocktailIngredient.setAmount('100ml');

  expect(cocktailIngredient.getId()).toBe(2);
  expect(cocktailIngredient.getCocktailId()).toBe(102);
  expect(cocktailIngredient.getIngredientId()).toBe(202);
  expect(cocktailIngredient.getAmount()).toBe('100ml');
});

test('givenCocktailIngredientPrismaObject_whenFromIsCalled_thenCreatesCocktailIngredientInstance', () => {
  const cocktailIngredientPrisma = {
    id: 1,
    cocktailId: 101,
    ingredientId: 201,
    amount: '50ml'
  };

  const newCocktailIngredient = CocktailIngredient.from(cocktailIngredientPrisma);

  expect(newCocktailIngredient.getId()).toBe(1);
  expect(newCocktailIngredient.getCocktailId()).toBe(101);
  expect(newCocktailIngredient.getIngredientId()).toBe(201);
  expect(newCocktailIngredient.getAmount()).toBe('50ml');
});