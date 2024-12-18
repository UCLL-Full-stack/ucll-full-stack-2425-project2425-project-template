import { Bestelling } from "../../model/bestelling";
import { Ingredient } from "../../model/ingredient";
import { Pokebowl } from "../../model/pokebowl";
import { User } from "../../model/user";
import bestellingService from "../../service/bestelling.service";

let createBestellingMock: jest.Mock;
let mockGetAllBestellingen: jest.Mock;
let mockGetBestellingById: jest.Mock;

const id = 1;
const rol = "Manager";
const datum = new Date('2014-12-16');
const user = new User({ id: 2, naam: "de Weerd", voornaam: "Nina", email: "nina.deweerd@student.ucll.be", wachtwoord: "passsssssword", adres: "adresstraat 12", gebruikersnaam: "NinaW", rol: "Manager" });
const pokebowls = [
    new Pokebowl({
        id: 1,
        naam: "Tofu pokebowl",
        type: "Tofu",
        beschrijving: "Nice tofu pokebowl with tomato and soya",
        prijs: 10.45,
        maxAantalIngredienten: 5,
        ingredienten: [
            new Ingredient({
                id: 4,
                naam: 'Tofu',
                type: 'Protein',
                aantal: 50,
                prijs: 3.61
            }),
            new Ingredient({
                id: 5,
                naam: 'Tomato',
                type: 'Topping',
                aantal: 30,
                prijs: 2.78
            }),
            new Ingredient({
                id: 6,
                naam: 'Soya',
                type: 'Sauce',
                aantal: 200,
                prijs: 1.32
            })
        ]
    })];

const bestellingen = [{
    user: new User({ naam: "Timmermans", voornaam: "Ashley", email: "ashley.timmermans@student.ucll.be", wachtwoord: "passwoooooord", adres: "adresstraat 1", gebruikersnaam: "AshleyT", rol: "Admin" }),
    datum: new Date('2024-10-24'),
    pokebowls: [
        new Pokebowl({
            id: 1,
            naam: "Salmon pokebowl",
            type: "Salmon",
            beschrijving: "Fishy salmon pokebowl with avocado and spicy mayo",
            prijs: 10.45,
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
        })
    ]
}];

beforeEach(() => {
    createBestellingMock = jest.fn();
    mockGetAllBestellingen = jest.fn();
    mockGetBestellingById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid bestelling, when bestelling is created, then bestelling is created with those values', () => {
    //given
    const newBestelling = new Bestelling({ user, datum, pokebowls });

    //when
    bestellingService.createBestelling = createBestellingMock(newBestelling);

    //then
    expect(createBestellingMock).toHaveBeenCalledTimes(1);
    expect(createBestellingMock).toHaveBeenCalledWith(new Bestelling({ user, datum, pokebowls }));
});

test('given all bestellingen, when all bestellingen are being requested, then show all bestellingen', () => {
    //given
    mockGetAllBestellingen.mockReturnValue(bestellingen);

    //when
    bestellingService.getAllBestellingen = mockGetAllBestellingen;
    const allBestellingen = bestellingService.getAllBestellingen({ rol }, { id });

    //then
    expect(mockGetAllBestellingen).toHaveBeenCalledTimes(1);
    expect(allBestellingen).toEqual(bestellingen);
});

test('given one bestelling, when one bestelling is being requested, then show that bestelling', () => {
    //given
    mockGetBestellingById.mockReturnValue(bestellingen[0]);

    //when
    bestellingService.getBestellingById = mockGetBestellingById;
    const bestelling = bestellingService.getBestellingById(id);

    //then
    expect(mockGetBestellingById).toHaveBeenCalledTimes(1);
    expect(bestelling).toEqual(bestellingen[0]);
});