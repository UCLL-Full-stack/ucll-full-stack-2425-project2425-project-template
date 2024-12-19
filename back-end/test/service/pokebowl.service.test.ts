import ingredientDb from "../../repository/ingredient.db";
import ingredientService from "../../service/ingredient.service";
import { Ingredient } from "../../model/ingredient";
import { Pokebowl } from "../../model/pokebowl";
import pokebowlService from "../../service/pokebowl.service";

let createPokebowlMock: jest.Mock;
let mockGetAllPokebowls: jest.Mock;
let mockGetPokebowlById: jest.Mock;

const naam = "Salmon pokebowl";
const type = "Salmon";
const beschrijving = "Fishy salmon pokebowl with avocado and spicy mayo";
const maxAantalIngredienten = 5;

const pokebowls = [
    new Pokebowl({
        id: 1,
        naam: "Salmon pokebowl",
        type: "Salmon",
        beschrijving: "Fishy salmon pokebowl with avocado and spicy mayo",
        maxAantalIngredienten: 5,
        ingredienten: [
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
            })
        ]
    }),
];

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
];

beforeEach(() => {
    createPokebowlMock = jest.fn();
    mockGetAllPokebowls = jest.fn();
    mockGetPokebowlById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid pokebowl, when pokebowl is created, then pokebowl is created with those values', () => {
    //given
    const newPokebowl = new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    //when
    pokebowlService.createPokebowl = createPokebowlMock(newPokebowl);

    //then
    expect(createPokebowlMock).toHaveBeenCalledTimes(1);
    expect(createPokebowlMock).toHaveBeenCalledWith(new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten }));
});

test('given all ingredients, when all ingredients are being requested, then show all ingredients', () => {
    //given
    mockGetAllPokebowls.mockReturnValue(pokebowls);

    //when
    pokebowlService.getAllPokebowls = mockGetAllPokebowls;
    const allPokebowls = pokebowlService.getAllPokebowls();

    //then
    expect(mockGetAllPokebowls).toHaveBeenCalledTimes(1);
    expect(allPokebowls).toEqual(pokebowls);
});

test('given one pokebowl, when one pokebowl is being requested, then show that pokebowl', () => {
    //given
    mockGetPokebowlById.mockReturnValue(pokebowls[0]);

    //when
    ingredientService.getIngredientById = mockGetPokebowlById;
    const salmon = ingredientService.getIngredientById(1);

    //then
    expect(mockGetPokebowlById).toHaveBeenCalledTimes(1);
    expect(salmon).toEqual(pokebowls[0]);
});
