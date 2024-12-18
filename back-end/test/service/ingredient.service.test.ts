import ingredientDb from "../../repository/ingredient.db";
import ingredientService from "../../service/ingredient.service";
import { Ingredient } from "../../model/ingredient";

let addIngredientMock: jest.Mock;
let mockGetAllIngredients: jest.Mock;
let mockGetIngredientById: jest.Mock;
let mockUpdateIngredient: jest.Mock;

const naam = "Mango";
const type = "Topping";
const aantal = 190;
const prijs = 1.78;
const ingredientLimit = 6;
const rol = "Admin";

const ingredienten = [
    new Ingredient({
        id: 1,
        naam: 'Salmon',
        type: 'Protein',
        aantal: 50,
        prijs: 3.61,
        ingredientLimit: 6
    }),
    new Ingredient({
        id: 2,
        naam: 'Avocado',
        type: 'Topping',
        aantal: 30,
        prijs: 2.78,
        ingredientLimit: 6
    }),
    new Ingredient({
        id: 3,
        naam: 'Spicy mayo',
        type: 'Sauce',
        aantal: 200,
        prijs: 1.32,
        ingredientLimit: 6
    }),
]

beforeEach(() => {
    addIngredientMock = jest.fn();
    mockGetAllIngredients = jest.fn();
    mockGetIngredientById = jest.fn();
    mockUpdateIngredient = jest.fn();
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
    const allIngredienten = ingredientService.getAllIngredienten({ rol });

    //then
    expect(mockGetAllIngredients).toHaveBeenCalledTimes(1);
    expect(allIngredienten).toEqual(ingredienten);
});

test('given one ingredient, when one ingredient is being requested, then show that ingredient', () => {
    //given
    mockGetIngredientById.mockReturnValue(ingredienten[0]);

    //when
    ingredientService.getIngredientById = mockGetIngredientById;
    const salmon = ingredientService.getIngredientById(1);

    //then
    expect(mockGetIngredientById).toHaveBeenCalledTimes(1);
    expect(salmon).toEqual(ingredienten[0]);
});

test('given a valid ingredient, when ingredient is updated, then ingredient is updated with those values', () => {
    // given
    const updatedIngredientData = new Ingredient({ naam, type, aantal, prijs, ingredientLimit });

    // when
    ingredientService.updateIngredient = mockUpdateIngredient(1, updatedIngredientData)

    // then
    expect(mockUpdateIngredient).toHaveBeenCalledTimes(1);
    expect(mockUpdateIngredient).toHaveBeenCalledWith(1, updatedIngredientData);
});