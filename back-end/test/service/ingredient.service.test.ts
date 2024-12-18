import ingredientDb from "../../repository/ingredient.db";
import ingredientService from "../../service/ingredient.service";
import { Ingredient } from "../../model/ingredient";

let addIngredientMock: jest.Mock;
let mockGetAllIngredients: jest.Mock;

const naam = "Mango";
const type = "Topping";
const aantal = 190;
const prijs = 1.78;

const ingredienten = [
    new Ingredient({
        id: 1,
        naam: 'Salmon',
        type: 'Protein',
        aantal: 50,
        prijs: 3.61
    }),
    new Ingredient({
        id: 2,
        naam: 'Avocado',
        type: 'Topping',
        aantal: 30,
        prijs: 2.78
    }),
    new Ingredient({
        id: 3,
        naam: 'Spicy mayo',
        type: 'Sauce',
        aantal: 200,
        prijs: 1.32
    }),
]

beforeEach(() => {
    addIngredientMock = jest.fn();
    mockGetAllIngredients = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid ingredient, when ingredient is created, then ingredient is created with those values', () => {
    //given
    const newIngredient = new Ingredient({ naam, type, aantal, prijs });

    //when
    ingredientService.addIngredient = addIngredientMock(newIngredient);

    //then
    expect(addIngredientMock).toHaveBeenCalledTimes(1);
    expect(addIngredientMock).toHaveBeenCalledWith(new Ingredient({ naam, type, aantal, prijs }));
});

test('given all ingredients, when all ingredients are being requested, then show all ingredients', () => {
    //given
    mockGetAllIngredients.mockReturnValue(ingredienten);

    //when
    ingredientService.getAllIngredienten = mockGetAllIngredients;
    const allIngredienten = ingredientService.getAllIngredienten();

    //then
    expect(mockGetAllIngredients).toHaveBeenCalledTimes(1);
    expect(allIngredienten).toEqual(ingredienten);
});
