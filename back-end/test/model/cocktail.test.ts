import { Cocktail } from "../../model/cocktail";


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

test('givenValidValues_whenCocktailIsCreated_thenCocktailHasThoseValues', () => {
    // then
    expect(cocktail.getId()).toBe(1);
    expect(cocktail.getName()).toBe('Mojito');
    expect(cocktail.getDescription()).toBe('A refreshing cocktail');
    expect(cocktail.getStrongness()).toBe(5);
    expect(cocktail.getImage()).toBe('mojito.jpg');
});

test('givenNewName_whenSetNameIsCalled_thenNameIsUpdated', () => {
    // when
    cocktail.setName('Pina Colada');

    // then
    expect(cocktail.getName()).toBe('Pina Colada');
});

test('givenNewDescription_whenSetDescriptionIsCalled_thenDescriptionIsUpdated', () => {
    // when
    cocktail.setDescription('A tropical delight');

    // then
    expect(cocktail.getDescription()).toBe('A tropical delight');
});

test('givenNewStrongness_whenSetStrongnessIsCalled_thenStrongnessIsUpdated', () => {
    // when
    cocktail.setStrongness(8);

    // then
    expect(cocktail.getStrongness()).toBe(8);
});

test('givenTwoIdenticalCocktails_whenEqualsIsCalled_thenItReturnsTrue', () => {
    // given
    const identicalCocktail = new Cocktail({
        id: 1,
        name: 'Mojito',
        description: 'A refreshing cocktail',
        strongness: 5,
        image: 'mojito.jpg'
    });

    // then
    expect(cocktail.equals(identicalCocktail)).toBe(true);
});

test('givenTwoDifferentCocktails_whenEqualsIsCalled_thenItReturnsFalse', () => {
    // given
    const differentCocktail = new Cocktail({
        id: 2,
        name: 'Old Fashioned',
        description: 'A classic cocktail',
        strongness: 7,
        image: 'old-fashioned.jpg'
    }); 
    // then
    expect(cocktail.equals(differentCocktail)).toBe(false);
});

