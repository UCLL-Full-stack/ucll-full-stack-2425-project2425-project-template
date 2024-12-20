import { Ingredient } from '../../model/ingredient';

let ingredient: Ingredient;

beforeEach(() => {
  ingredient = new Ingredient({ id: 1, name: 'Sugar' });
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

test('givenIdenticalIngredients_whenEqualsIsCalled_thenReturnsTrue', () => {
  // given
  const otherIngredient = new Ingredient({ id: 1, name: 'Sugar' });

  // when
  const result = ingredient.equals(otherIngredient);

  // then
  expect(result).toBe(true);
});

test('givenDifferentIngredients_whenEqualsIsCalled_thenReturnsFalse', () => {
  // given
  const otherIngredient = new Ingredient({ id: 2, name: 'Salt' });

  // when
  const result = ingredient.equals(otherIngredient);

  // then
  expect(result).toBe(false);
});

test('givenIngredientPrismaObject_whenFromIsCalled_thenCreatesIngredientInstance', () => {
  // given
  const ingredientPrisma = { id: 1, name: 'Sugar' };

  // when
  const newIngredient = Ingredient.from(ingredientPrisma);

  // then
  expect(newIngredient.getId()).toBe(1);
  expect(newIngredient.getName()).toBe('Sugar');
});