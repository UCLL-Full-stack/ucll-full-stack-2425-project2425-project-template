import groepDB from "../../repository/groep.db";
import groepService from "../../service/groep.service";
import { Groep } from "../../model/groep";
import { Activiteit } from "../../model/activiteit";
import { Leiding, PublicLeiding } from "../../model/leiding";
import { Rol } from "../../types";
import { UnauthorizedError } from "express-jwt";

let mockGroepRepoGetAllGroepen: jest.Mock;
let mockGroepRepoGetGroepByNaam: jest.Mock;
let mockGroepRepoAddActiviteitToGroep: jest.Mock;
let mockGroepRepoGetLeidingByGroep: jest.Mock;
let mockGroepRepoGetActiviteitenByGroep: jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    mockGroepRepoGetAllGroepen = jest.fn();
    mockGroepRepoGetGroepByNaam = jest.fn();
    mockGroepRepoAddActiviteitToGroep = jest.fn();
    mockGroepRepoGetLeidingByGroep = jest.fn();
    mockGroepRepoGetActiviteitenByGroep = jest.fn();

    groepDB.getAllGroepen = mockGroepRepoGetAllGroepen;
    groepDB.getGroepByNaam = mockGroepRepoGetGroepByNaam;
    groepDB.addActiviteitToGroep = mockGroepRepoAddActiviteitToGroep;
    groepDB.getLeidingByGroep = mockGroepRepoGetLeidingByGroep;
    groepDB.getActiviteitenByGroep = mockGroepRepoGetActiviteitenByGroep;
});

test("getAllGroepen should return all groepen", async () => {
    const groepen = [new Groep({ id: 1, naam: "Groep 1", beschrijving: "Beschrijving 1" })];
    mockGroepRepoGetAllGroepen.mockResolvedValue(groepen);

    const result = await groepService.getAllGroepen();

    expect(result).toBe(groepen);
    expect(mockGroepRepoGetAllGroepen).toHaveBeenCalledTimes(1);
});

test("getGroepByNaam should return a groep by naam", async () => {
    const groep = new Groep({ id: 1, naam: "Groep 1", beschrijving: "Beschrijving 1" });
    mockGroepRepoGetGroepByNaam.mockResolvedValue(groep);

    const result = await groepService.getGroepByNaam("Groep 1");

    expect(result).toBe(groep);
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
});

test("getGroepByNaam should throw an error if the groep is not found", async () => {
    mockGroepRepoGetGroepByNaam.mockResolvedValue(null);

    await expect(groepService.getGroepByNaam("Nonexistent Groep")).rejects.toThrow("Groep not found");
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
});

test("addActiviteitToGroep should add an activiteit to a groep", async () => {
    const groep = new Groep({ id: 1, naam: "Groep 1", beschrijving: "Beschrijving 1" });
    const activiteit = new Activiteit({ id: 1, naam: "Activiteit 1", beschrijving: "Beschrijving 1", begindatum: new Date(), einddatum: new Date() });
    mockGroepRepoGetGroepByNaam.mockResolvedValue(groep);
    mockGroepRepoAddActiviteitToGroep.mockResolvedValue(groep);

    const result = await groepService.addActiviteitToGroep("Groep 1", activiteit);

    expect(result).toBe(groep);
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
    expect(mockGroepRepoAddActiviteitToGroep).toHaveBeenCalledTimes(1);
});

test("addActiviteitToGroep should throw an error if the groep is not found", async () => {
    const activiteit = new Activiteit({ id: 1, naam: "Activiteit 1", beschrijving: "Beschrijving 1", begindatum: new Date(), einddatum: new Date() });
    mockGroepRepoGetGroepByNaam.mockResolvedValue(null);

    await expect(groepService.addActiviteitToGroep("Nonexistent Groep", activiteit)).rejects.toThrow("Groep not found");
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
    expect(mockGroepRepoAddActiviteitToGroep).not.toHaveBeenCalled();
});

test("getLeidingForGroep should return leiding for a groep", async () => {
    const leiding = new Leiding({ id: 1, voornaam: "Voornaam", naam: "Achternaam", email: "email@example.com", telefoon: "1234567890", rol: "HOOFDLEIDING", totem: "Totem", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    const groep = new Groep({ id: 1, naam: "Groep 1", beschrijving: "Beschrijving 1" });
    mockGroepRepoGetGroepByNaam.mockResolvedValue(groep);
    mockGroepRepoGetLeidingByGroep.mockResolvedValue([PublicLeiding.from({leiding: leiding})]);

    const result = await groepService.getLeidingForGroep("Groep 1");

    expect(result).toEqual([PublicLeiding.from({leiding: leiding})]);
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
    expect(mockGroepRepoGetLeidingByGroep).toHaveBeenCalledTimes(1);
});

test("getLeidingForGroep should throw an error if the groep is not found", async () => {
    mockGroepRepoGetGroepByNaam.mockResolvedValue(null);

    await expect(groepService.getLeidingForGroep("Nonexistent Groep")).rejects.toThrow("Groep not found");
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
    expect(mockGroepRepoGetLeidingByGroep).not.toHaveBeenCalled();
});

test("getActiviteitenForGroep should return activiteiten for a groep", async () => {
    const activiteiten = [new Activiteit({ id: 1, naam: "Activiteit 1", beschrijving: "Beschrijving 1", begindatum: new Date(), einddatum: new Date() })];
    const groep = new Groep({ id: 1, naam: "Groep 1", beschrijving: "Beschrijving 1" });
    mockGroepRepoGetGroepByNaam.mockResolvedValue(groep);
    mockGroepRepoGetActiviteitenByGroep.mockResolvedValue(activiteiten);

    const result = await groepService.getActiviteitenForGroep("Groep 1");

    expect(result).toBe(activiteiten);
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
    expect(mockGroepRepoGetActiviteitenByGroep).toHaveBeenCalledTimes(1);
});

test("getActiviteitenForGroep should throw an error if the groep is not found", async () => {
    mockGroepRepoGetGroepByNaam.mockResolvedValue(null);

    await expect(groepService.getActiviteitenForGroep("Nonexistent Groep")).rejects.toThrow("Groep not found");
    expect(mockGroepRepoGetGroepByNaam).toHaveBeenCalledTimes(1);
    expect(mockGroepRepoGetActiviteitenByGroep).not.toHaveBeenCalled();
});