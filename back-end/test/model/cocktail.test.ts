import { Cocktail } from '../../model/cocktail';

let cocktail: Cocktail;

beforeEach(() => {
  cocktail = new Cocktail({
    id: 1,
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg'
  });
});

test('givenValidProperties_whenConstructorIsCalled_thenPropertiesAreInitializedCorrectly', () => {
  expect(cocktail.getId()).toBe(1);
  expect(cocktail.getName()).toBe('Mojito');
  expect(cocktail.getDescription()).toBe('A refreshing cocktail');
  expect(cocktail.getStrongness()).toBe(5);
  expect(cocktail.getImage()).toBe('mojito.jpg');
});

test('givenCocktailInstance_whenGettersAreCalled_thenReturnCorrectValues', () => {
  expect(cocktail.getId()).toBe(1);
  expect(cocktail.getName()).toBe('Mojito');
  expect(cocktail.getDescription()).toBe('A refreshing cocktail');
  expect(cocktail.getStrongness()).toBe(5);
  expect(cocktail.getImage()).toBe('mojito.jpg');
});

test('givenCocktailInstance_whenSettersAreCalled_thenPropertiesAreUpdatedCorrectly', () => {
  cocktail.setName('Old Fashioned');
  cocktail.setDescription('A classic cocktail');
  cocktail.setStrongness(4);

  expect(cocktail.getName()).toBe('Old Fashioned');
  expect(cocktail.getDescription()).toBe('A classic cocktail');
  expect(cocktail.getStrongness()).toBe(4);
});

test('givenIdenticalCocktails_whenEqualsIsCalled_thenReturnsTrue', () => {
  const cocktail1 = new Cocktail({
    id: 1,
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg'
  });

  const cocktail2 = new Cocktail({
    id: 1,
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg'
  });

  expect(cocktail1.equals(cocktail2)).toBe(true);
});

test('givenDifferentCocktails_whenEqualsIsCalled_thenReturnsFalse', () => {
  const cocktail1 = new Cocktail({
    id: 1,
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg'
  });

  const cocktail2 = new Cocktail({
    id: 2,
    name: 'Old Fashioned',
    description: 'A classic cocktail',
    strongness: 4,
    image: 'old_fashioned.jpg'
  });

  expect(cocktail1.equals(cocktail2)).toBe(false);
});

test('givenCocktailPrismaObject_whenFromIsCalled_thenCreatesCocktailInstance', () => {
  const cocktailPrisma = {
    id: 1,
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg'
  };

  const cocktail = Cocktail.from(cocktailPrisma);

  expect(cocktail.getId()).toBe(1);
  expect(cocktail.getName()).toBe('Mojito');
  expect(cocktail.getDescription()).toBe('A refreshing cocktail');
  expect(cocktail.getStrongness()).toBe(5);
  expect(cocktail.getImage()).toBe('mojito.jpg');
});