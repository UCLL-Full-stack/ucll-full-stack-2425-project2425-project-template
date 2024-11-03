import { Cocktail } from "../../model/cocktail";
import cocktailDb from "../../repository/cocktail.db";
import cocktailService from "../../service/cocktail.service";

let mockGetAllCocktails: jest.Mock;
let mockGetCocktailById: jest.Mock;
let mockAddCocktail: jest.Mock;

beforeEach(() => {
    mockGetAllCocktails = jest.fn();
    mockGetCocktailById = jest.fn();
    mockAddCocktail = jest.fn();

    cocktailDb.getAllCocktails = mockGetAllCocktails;
    cocktailDb.getCocktailById = mockGetCocktailById;
    cocktailDb.addCocktail = mockAddCocktail;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenCocktailsInDatabase_whenGetAllCocktailsIsCalled_thenItReturnsAllCocktails', () => {
    // given
    const cocktails = [
        new Cocktail(1, 'Mojito', 'A refreshing cocktail', 5, 'mojito.jpg'),
        new Cocktail(2, 'Old Fashioned', 'A classic cocktail', 7, 'old-fashioned.jpg'),
    ];
    mockGetAllCocktails.mockReturnValue(cocktails);

    // when
    const result = cocktailService.getAllCocktails();

    // then
    expect(mockGetAllCocktails).toHaveBeenCalled();
    expect(result).toEqual(cocktails);
});

test('givenAValidCocktailId_whenGetCocktailByIdIsCalled_thenItReturnsTheCocktail', () => {
    // given
    const cocktail = new Cocktail(1, 'Mojito', 'A refreshing cocktail', 5, 'mojito.jpg');
    mockGetCocktailById.mockReturnValue(cocktail);

    // when
    const result = cocktailService.getCocktailById({ id: 1 });

    // then
    expect(mockGetCocktailById).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(cocktail);
});

test('givenAnInvalidCocktailId_whenGetCocktailByIdIsCalled_thenItThrowsAnError', () => {
    // given
    mockGetCocktailById.mockReturnValue(null);

    // when
    const callWithInvalidId = () => cocktailService.getCocktailById({ id: 999 });

    // then
    expect(callWithInvalidId).toThrowError('Cocktail with id 999 not found');
    expect(mockGetCocktailById).toHaveBeenCalledWith({ id: 999 });
});

test('givenValidCocktailData_whenAddCocktailIsCalled_thenItAddsTheCocktailAndReturnsIt', () => {
    // given
    const newCocktailData = {
        name: 'Margarita',
        description: 'A tangy, classic cocktail',
        strongness: 6,
        imageUrl: 'margarita.jpg',
    };
    const addedCocktail = new Cocktail(3, 'Margarita', 'A tangy, classic cocktail', 6, 'margarita.jpg');
    mockAddCocktail.mockReturnValue(addedCocktail);

    // when
    const result = cocktailService.addCocktail(newCocktailData);

    // then
    expect(mockAddCocktail).toHaveBeenCalledWith(newCocktailData);
    expect(result).toEqual(addedCocktail);
});