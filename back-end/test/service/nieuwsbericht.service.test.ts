import nieuwsRepo from "../../repository/nieuwsbericht.db";
import leidingRepo from "../../repository/leiding.db";
import nieuwsberichtService from "../../service/nieuwsbericht.service";
import { Nieuwsbericht, PublicNieuwsbericht } from "../../model/nieuwsbericht";
import { Rol } from "../../types";
import { UnauthorizedError } from "express-jwt";
import { Leiding } from "../../model/leiding";

let mockNieuwsRepoCreateNieuwsbericht: jest.Mock;
let mockNieuwsRepoUpdateNieuwsbericht: jest.Mock;
let mockNieuwsRepoDeleteNieuwsbericht: jest.Mock;
let mockLeidingRepoGetLeidingByTotem: jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    mockNieuwsRepoCreateNieuwsbericht = jest.fn();
    mockNieuwsRepoUpdateNieuwsbericht = jest.fn();
    mockNieuwsRepoDeleteNieuwsbericht = jest.fn();
    mockLeidingRepoGetLeidingByTotem = jest.fn();

    nieuwsRepo.createNieuwsbericht = mockNieuwsRepoCreateNieuwsbericht;
    nieuwsRepo.updateNieuwsbericht = mockNieuwsRepoUpdateNieuwsbericht;
    nieuwsRepo.deleteNieuwsbericht = mockNieuwsRepoDeleteNieuwsbericht;
    leidingRepo.getLeidingByTotem = mockLeidingRepoGetLeidingByTotem;
});

test("createNieuwsbericht should create a nieuwsbericht", async () => {
    const nieuwsbericht = new Nieuwsbericht({
        id: 1,
        titel: "Test Nieuwsbericht",
        inhoud: "Test Inhoud",
        datum: new Date(),
        auteur: 1
    });
    const totem = "Test Totem";
    const rol: Rol = "HOOFDLEIDING";

    mockLeidingRepoGetLeidingByTotem.mockResolvedValue(new Leiding({
        id: 1,
        voornaam: "Voornaam",
        naam: "Achternaam",
        email: "email@example.com",
        telefoon: "1234567890",
        rol: rol,
        totem: totem,
        groepId: 1,
        nieuwsberichten: [],
        wachtwoord: "password"
    }));
    mockNieuwsRepoCreateNieuwsbericht.mockResolvedValue(nieuwsbericht);

    const result = await nieuwsberichtService.createNieuwsbericht(nieuwsbericht, totem, rol);

    expect(result).toEqual(nieuwsbericht);
    expect(mockLeidingRepoGetLeidingByTotem).toHaveBeenCalledTimes(1);
    expect(mockNieuwsRepoCreateNieuwsbericht).toHaveBeenCalledTimes(1);
});

test("createNieuwsbericht should throw an error if the role is not authorized", async () => {
    const nieuwsbericht = new Nieuwsbericht({
        id: 1,
        titel: "Test Nieuwsbericht",
        inhoud: "Test Inhoud",
        datum: new Date(),
        auteur: 1
    });
    const totem = "Test Totem";
    const rol: Rol = "LEIDING";

    await expect(nieuwsberichtService.createNieuwsbericht(nieuwsbericht, totem, rol)).rejects.toThrow(UnauthorizedError);
    expect(mockLeidingRepoGetLeidingByTotem).not.toHaveBeenCalled();
});

test("updateNieuwsbericht should update a nieuwsbericht", async () => {
    const nieuwsbericht = new Nieuwsbericht({
        id: 1,
        titel: "Test Nieuwsbericht",
        inhoud: "Test Inhoud",
        datum: new Date(),
        auteur: 1
    });
    const totem = "Test Totem";
    const rol: Rol = "HOOFDLEIDING";

    mockLeidingRepoGetLeidingByTotem.mockResolvedValue(new Leiding({
        id: 1,
        voornaam: "Voornaam",
        naam: "Achternaam",
        email: "email@example.com",
        telefoon: "1234567890",
        rol: rol,
        totem: totem,
        groepId: 1,
        nieuwsberichten: [],
        wachtwoord: "password"
    }));
    mockNieuwsRepoUpdateNieuwsbericht.mockResolvedValue(PublicNieuwsbericht.from({nieuwsbericht, auteur: "Voornaam Achternaam"}));

    const result = await nieuwsberichtService.updateNieuwsbericht(nieuwsbericht, totem, rol);

    expect(result).toEqual(PublicNieuwsbericht.from({ nieuwsbericht, auteur: "Voornaam Achternaam" }));
    expect(mockLeidingRepoGetLeidingByTotem).toHaveBeenCalledTimes(1);
    expect(mockNieuwsRepoUpdateNieuwsbericht).toHaveBeenCalledTimes(1);
});

test("updateNieuwsbericht should throw an error if the role is not authorized", async () => {
    const nieuwsbericht = new Nieuwsbericht({
        id: 1,
        titel: "Test Nieuwsbericht",
        inhoud: "Test Inhoud",
        datum: new Date(),
        auteur: 1
    });
    const totem = "Test Totem";
    const rol: Rol = "LEIDING";

    await expect(nieuwsberichtService.updateNieuwsbericht(nieuwsbericht, totem, rol)).rejects.toThrow(UnauthorizedError);
    expect(mockLeidingRepoGetLeidingByTotem).not.toHaveBeenCalled();
    expect(mockNieuwsRepoUpdateNieuwsbericht).not.toHaveBeenCalled();
});

test("deleteNieuwsbericht should delete a nieuwsbericht", async () => {
    const nieuwsbericht = new Nieuwsbericht({
        id: 1,
        titel: "Test Nieuwsbericht",
        inhoud: "Test Inhoud",
        datum: new Date(),
        auteur: 1
    });
    const totem = "Test Totem";
    const rol: Rol = "HOOFDLEIDING";

    mockLeidingRepoGetLeidingByTotem.mockResolvedValue(new Leiding({
        id: 1,
        voornaam: "Voornaam",
        naam: "Achternaam",
        email: "email@example.com",
        telefoon: "1234567890",
        rol: rol,
        totem: totem,
        groepId: 1,
        nieuwsberichten: [],
        wachtwoord: "password"
    }));
    mockNieuwsRepoDeleteNieuwsbericht.mockResolvedValue(nieuwsbericht);

    await nieuwsberichtService.deleteNieuwsbericht(1, totem, rol);

    expect(mockNieuwsRepoDeleteNieuwsbericht).toHaveBeenCalledTimes(1);
});

test("deleteNieuwsbericht should throw an error if the role is not authorized", async () => {
    const totem = "Test Totem";
    const rol: Rol = "LEIDING";

    await expect(nieuwsberichtService.deleteNieuwsbericht(1, totem, rol)).rejects.toThrow(UnauthorizedError);
    expect(mockNieuwsRepoDeleteNieuwsbericht).not.toHaveBeenCalled();
});