import { Cocktail } from '../../model/cocktail';

let cocktail: Cocktail;

beforeEach(() => {
  cocktail = new Cocktail({
    id: 1,
    name: 'Mojito',
    description: 'A refreshing cocktail',
    strongness: 5,
    image: 'mojito.jpg',
    authorId: 1
  });
});

test('givenValidProperties_whenConstructorIsCalled_thenPropertiesAreInitializedCorrectly', () => {
  expect(cocktail.getId()).toBe(1);
  expect(cocktail.getName()).toBe('Mojito');
  expect(cocktail.getDescription()).toBe('A refreshing cocktail');
  expect(cocktail.getStrongness()).toBe(5);
  expect(cocktail.getImage()).toBe('mojito.jpg');
  expect(cocktail.getAuthorId()).toBe(1);
});

test('givenCocktailInstance_whenGettersAreCalled_thenReturnCorrectValues', () => {
  expect(cocktail.getId()).toBe(1);
  expect(cocktail.getName()).toBe('Mojito');
  expect(cocktail.getDescription()).toBe('A refreshing cocktail');
  expect(cocktail.getStrongness()).toBe(5);
  expect(cocktail.getImage()).toBe('mojito.jpg');
  expect(cocktail.getAuthorId()).toBe(1);
});

test('givenInvalidProperties_whenConstructorIsCalled_thenThrowsError', () => {
  expect(() => {
    new Cocktail({
      id: 2,
      name: '',
      description: 'A cocktail with no name',
      strongness: 5,
      image: 'noname.jpg',
      authorId: 1
    });
  }).toThrow('Name is required');

  expect(() => {
    new Cocktail({
      id: 3,
      name: 'No Description',
      description: '',
      strongness: 5,
      image: 'nodescription.jpg',
      authorId: 1
    });
  }).toThrow('Description is required');

  expect(() => {
    new Cocktail({
      id: 4,
      name: 'No Strongness',
      description: 'A cocktail with no strongness',
      strongness: null as any,
      image: 'nostrongness.jpg',
      authorId: 1
    });
  }).toThrow('Strongness is required');

  expect(() => {
    new Cocktail({
      id: 5,
      name: 'No Image',
      description: 'A cocktail with no image',
      strongness: 5,
      image: '',
      authorId: 1
    });
  }).toThrow('Image is required');

  expect(() => {
    new Cocktail({
      id: 6,
      name: 'No Author',
      description: 'A cocktail with no author',
      strongness: 5,
      image: 'noauthor.jpg',
      authorId: null as any
    });
  }).toThrow('Author ID is required');
});