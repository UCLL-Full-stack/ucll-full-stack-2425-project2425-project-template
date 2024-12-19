import { Ingredient } from "../../model/ingredient";
import { Pokebowl } from "../../model/pokebowl";
import { User } from "../../model/user";
import userService from "../../service/user.service";

let createUserMock: jest.Mock;
let mockGetAllUsers: jest.Mock;
let mockGetUserById: jest.Mock;
let mockGetUserBestellingen: jest.Mock;
let mockGetUserByUsername: jest.Mock;
let mockDeleteUser: jest.Mock;
let mockUpdateUser: jest.Mock;

const id = 1;
const naam = "Tester";
const voornaam = "Test";
const email = "test.tester@student.ucll.be";
const wachtwoord = "helloworld";
const adres = "adresstraat 123";
const gebruikersnaam = "TestR";
const rol = "Klant";

const users = [
    new User({ id: 1, naam: "de Weerd", voornaam: "Nina", email: "nina.deweerd@student.ucll.be", wachtwoord: "passsssssword", adres: "adresstraat 12", gebruikersnaam: "NinaW", rol: "Manager" }),
    new User({ id: 2, naam: "Timmermans", voornaam: "Ashley", email: "ashley.timmermans@student.ucll.be", wachtwoord: "passwoooooord", adres: "adresstraat 1", gebruikersnaam: "AshleyT", rol: "Admin" }),
];

const bestellingen = {
    user: new User({ id: 1, naam: "de Weerd", voornaam: "Nina", email: "nina.deweerd@student.ucll.be", wachtwoord: "passsssssword", adres: "adresstraat 12", gebruikersnaam: "NinaW", rol: "Manager" }),
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
};



beforeEach(() => {
    createUserMock = jest.fn();
    mockGetAllUsers = jest.fn();
    mockGetUserById = jest.fn();
    mockGetUserBestellingen = jest.fn();
    mockGetUserByUsername = jest.fn();
    mockDeleteUser = jest.fn();
    mockUpdateUser = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});


test('given a valid user, when user is created, then user is created with those values', () => {
    //given
    const newUser = new User({ naam, voornaam, email, wachtwoord, adres, gebruikersnaam, rol });

    //when
    userService.createUser = createUserMock(newUser);

    //then
    expect(createUserMock).toHaveBeenCalledTimes(1);
    expect(createUserMock).toHaveBeenCalledWith(new User({ naam, voornaam, email, wachtwoord, adres, gebruikersnaam, rol }));
});

test('given all users, when all users are being requested, then show all users', () => {
    //given
    mockGetAllUsers.mockReturnValue(users);

    //when
    userService.getAllUsers = mockGetAllUsers;
    const allUsers = userService.getAllUsers({ rol });

    //then
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    expect(allUsers).toEqual(users);
});

test('given one users, when one users is being requested, then show that user', () => {
    //given
    mockGetUserById.mockReturnValue(users[0]);

    //when
    userService.getUserById = mockGetUserById;
    const user = userService.getUserById(id);

    //then
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
    expect(user).toEqual(users[0]);
});

test('given one users, when one users is being with their username requested, then show that user', () => {
    //given
    mockGetUserByUsername.mockReturnValue(users[0]);

    //when
    userService.getUserByUsername = mockGetUserByUsername;
    const user = userService.getUserByUsername({ gebruikersnaam: gebruikersnaam });

    //then
    expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(user).toEqual(users[0]);
});

test('given all user bestellingen, when all user bestellingen are being requested, then show all user bestellingen', () => {
    //given
    mockGetUserBestellingen.mockReturnValue(bestellingen);

    //when
    userService.getUserBestellingen = mockGetUserBestellingen;
    const allBestellingen = userService.getUserBestellingen(id);

    //then
    expect(mockGetUserBestellingen).toHaveBeenCalledTimes(1);
    expect(allBestellingen).toEqual(bestellingen);
});

test('given a valid user, when user is updated, then user is updated with those values', () => {
    // given
    const updatedUserData = new User({ naam, voornaam, email, wachtwoord, adres, gebruikersnaam, rol });

    // when
    userService.updateUser = mockUpdateUser(1, updatedUserData);

    // then
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(mockUpdateUser).toHaveBeenCalledWith(1, updatedUserData);
});

test('given valid user info, when user is deleted, then user is deleted', () => {
    // given

    // when
    userService.deleteUser = mockDeleteUser({ rol }, id);

    // then
    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockDeleteUser).toHaveBeenCalledWith({ rol }, id);
});