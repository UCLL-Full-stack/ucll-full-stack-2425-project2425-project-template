import activiteitDb from "../../repository/activiteit.db";
import groepService from "../../service/groep.service";
import { Activiteit } from "../../model/activiteit";
import { Rol } from "../../types";
import { UnauthorizedError } from "express-jwt";
import { mock } from "node:test";
import activiteitService from "../../service/activiteit.service";
import { Leiding } from "../../model/leiding";

let mockActiviteitRepoCreateActiviteit: jest.Mock;
let mockActiviteitRepoGetActiviteitById: jest.Mock;
let mockActiviteitRepoVerwijderActiviteit: jest.Mock;
let mockActiviteitRepoVeranderActiviteit: jest.Mock;
let mockGroepServiceGetLeidingForGroep: jest.Mock;
let mockGroepServiceGetActiviteitenForGroep: jest.Mock;
let mockGroepServiceAddActiviteitToGroep: jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    mockActiviteitRepoCreateActiviteit = jest.fn();
    mockActiviteitRepoGetActiviteitById = jest.fn();
    mockActiviteitRepoVerwijderActiviteit = jest.fn();
    mockActiviteitRepoVeranderActiviteit = jest.fn();
    mockGroepServiceGetLeidingForGroep = jest.fn();
    mockGroepServiceGetActiviteitenForGroep = jest.fn();
    mockGroepServiceAddActiviteitToGroep = jest.fn();

    activiteitDb.createActiviteit = mockActiviteitRepoCreateActiviteit;
    activiteitDb.getActiviteitById = mockActiviteitRepoGetActiviteitById;
    activiteitDb.verwijderActiviteit = mockActiviteitRepoVerwijderActiviteit;
    activiteitDb.veranderActiviteit = mockActiviteitRepoVeranderActiviteit;
    groepService.getLeidingForGroep = mockGroepServiceGetLeidingForGroep;
    groepService.getActiviteitenForGroep = mockGroepServiceGetActiviteitenForGroep;
    groepService.addActiviteitToGroep = mockGroepServiceAddActiviteitToGroep;
});

test("given valid parameters, when addActiviteit, then Activiteit is created", async () => {
    const activiteit = new Activiteit({
        id: 1,
        naam: "activiteit",
        beschrijving: "Dit is een activiteit",
        begindatum: new Date(),
        einddatum: new Date()
    });
    const groepNaam = "groep";
    const rol: Rol = "HOOFDLEIDING";
    const totem = "totem";
    mockGroepServiceGetLeidingForGroep.mockResolvedValue([new Leiding({
        id: 1,
        voornaam: "voornaam",
        naam: "achternaam",
        email: "email",
        totem: totem,
        wachtwoord: "",
        telefoon: "",
        rol: rol,
        nieuwsberichten: [],
        groepId: 0
    })]);
    mockActiviteitRepoCreateActiviteit.mockResolvedValue(activiteit);
    mockGroepServiceAddActiviteitToGroep.mockResolvedValue(activiteit);

    const result = await activiteitService.addActiviteit(activiteit,groepNaam, rol, totem);
    expect(result).toBe(activiteit);
    expect(mockActiviteitRepoCreateActiviteit).toHaveBeenCalledTimes(1);
    expect(mockGroepServiceAddActiviteitToGroep).toHaveBeenCalledTimes(1);
    expect(mockGroepServiceGetLeidingForGroep).toHaveBeenCalledTimes(1);
});

test('addActiviteit should throw an error if the groep is not found', async () => {
    const activiteit = new Activiteit({
        id: 1,
        naam: 'Test Activiteit',
        beschrijving: 'Test Beschrijving',
        begindatum: new Date(),
        einddatum: new Date()
    });
    const groepNaam = 'Nonexistent Groep';
    const rol = 'LEIDING';
    const totem = 'Test Totem';

    mockGroepServiceGetLeidingForGroep.mockResolvedValue(undefined);

    await expect(activiteitService.addActiviteit(activiteit, groepNaam, rol, totem)).rejects.toThrow('Groep not found');
    expect(mockGroepServiceGetLeidingForGroep).toHaveBeenCalledTimes(1);
    expect(mockActiviteitRepoCreateActiviteit).not.toHaveBeenCalled();
    expect(mockGroepServiceAddActiviteitToGroep).not.toHaveBeenCalled();
});

test("deleteActiviteit should delete an activiteit", async () => {
    const groepNaam = "Test Groep";
    const activiteitId = 1;
    const rol: Rol = "HOOFDLEIDING";
    const totem = "Test Totem";

    mockGroepServiceGetLeidingForGroep.mockResolvedValue([new Leiding({
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
    })]);
    mockGroepServiceGetActiviteitenForGroep.mockResolvedValue([new Activiteit({
        id: 1,
        naam: "Test Activiteit",
        beschrijving: "Test Beschrijving",
        begindatum: new Date(),
        einddatum: new Date()
    })]);
    mockActiviteitRepoGetActiviteitById.mockResolvedValue(new Activiteit({
        id: 1,
        naam: "Test Activiteit",
        beschrijving: "Test Beschrijving",
        begindatum: new Date(),
        einddatum: new Date()
    }));
    mockActiviteitRepoVerwijderActiviteit.mockResolvedValue("Activiteit succesvol verwijderd");

    const result = await activiteitService.deleteActiviteit(groepNaam, activiteitId, rol, totem);

    expect(result).toBe("Activiteit succesvol verwijderd");
    expect(mockGroepServiceGetLeidingForGroep).toHaveBeenCalledTimes(1);
    expect(mockGroepServiceGetActiviteitenForGroep).toHaveBeenCalledTimes(1);
    expect(mockActiviteitRepoGetActiviteitById).toHaveBeenCalledTimes(1);
    expect(mockActiviteitRepoVerwijderActiviteit).toHaveBeenCalledTimes(1);
});

test("updateActiviteit should update an activiteit", async () => {
    const activiteit = new Activiteit({
        id: 1,
        naam: "Test Activiteit",
        beschrijving: "Test Beschrijving",
        begindatum: new Date(),
        einddatum: new Date()
    });
    const groepNaam = "Test Groep";
    const rol: Rol = "HOOFDLEIDING";
    const totem = "Test Totem";

    mockGroepServiceGetLeidingForGroep.mockResolvedValue([new Leiding({
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
    })]);
    mockGroepServiceGetActiviteitenForGroep.mockResolvedValue([activiteit]);
    mockActiviteitRepoVeranderActiviteit.mockResolvedValue(activiteit);
    const result = await activiteitService.updateActiviteit(activiteit, groepNaam, rol, totem);

    expect(result).toBe(activiteit);
    expect(mockGroepServiceGetLeidingForGroep).toHaveBeenCalledTimes(1);
    expect(mockGroepServiceGetActiviteitenForGroep).toHaveBeenCalledTimes(1);
    expect(mockActiviteitRepoVeranderActiviteit).toHaveBeenCalledTimes(1);
});

test('deleteActiviteit should throw an error if the groep is not found', async () => {
    const groepNaam = 'Nonexistent Groep';
    const activiteitId = 1;
    const rol: Rol = 'HOOFDLEIDING';
    const totem = 'Test Totem';

    mockGroepServiceGetLeidingForGroep.mockResolvedValue(null);

    await expect(activiteitService.deleteActiviteit(groepNaam, activiteitId, rol, totem)).rejects.toThrow('Groep not found');
    expect(mockGroepServiceGetLeidingForGroep).toHaveBeenCalledTimes(1);
    expect(mockActiviteitRepoVerwijderActiviteit).not.toHaveBeenCalled();
});

test('deleteActiviteit should throw an error if the totem is wrong', async () => {
    const groepNaam = 'Test Groep';
    const activiteitId = 1;
    const rol: Rol = 'HOOFDLEIDING';
    const totem = 'Wrong Totem';

    mockGroepServiceGetLeidingForGroep.mockResolvedValue([new Leiding({
        id: 1,
        voornaam: 'Voornaam',
        naam: 'Achternaam',
        email: 'email@example.com',
        telefoon: '1234567890',
        rol: rol,
        totem: 'Correct Totem',
        groepId: 1,
        nieuwsberichten: [],
        wachtwoord: 'password'
    })]);

    await expect(activiteitService.deleteActiviteit(groepNaam, activiteitId, rol, totem)).rejects.toThrow(UnauthorizedError);
    expect(mockGroepServiceGetLeidingForGroep).toHaveBeenCalledTimes(1);
    expect(mockActiviteitRepoVerwijderActiviteit).not.toHaveBeenCalled();
});

test('updateActiviteit should throw an error if the totem is wrong', async () => {
    const activiteit = new Activiteit({
        id: 1,
        naam: 'Test Activiteit',
        beschrijving: 'Test Beschrijving',
        begindatum: new Date(),
        einddatum: new Date()
    });
    const groepNaam = 'Test Groep';
    const rol: Rol = 'HOOFDLEIDING';
    const totem = 'Wrong Totem';

    mockGroepServiceGetLeidingForGroep.mockResolvedValue([new Leiding({
        id: 1,
        voornaam: 'Voornaam',
        naam: 'Achternaam',
        email: 'email@example.com',
        telefoon: '1234567890',
        rol: rol,
        totem: 'Correct Totem',
        groepId: 1,
        nieuwsberichten: [],
        wachtwoord: 'password'
    })]);

    await expect(activiteitService.updateActiviteit(activiteit, groepNaam, rol, totem)).rejects.toThrow(UnauthorizedError);
    expect(mockGroepServiceGetLeidingForGroep).toHaveBeenCalledTimes(1);
    expect(mockActiviteitRepoVeranderActiviteit).not.toHaveBeenCalled();
});