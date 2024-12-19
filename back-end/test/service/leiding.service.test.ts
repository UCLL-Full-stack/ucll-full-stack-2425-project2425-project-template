import leidingRepo from "../../repository/leiding.db";
import groepRepo from "../../repository/groep.db";
import leidingService from "../../service/leiding.service";
import { Leiding, PublicLeiding } from "../../model/leiding";
import { Rol } from "../../types";
import { UnauthorizedError } from "express-jwt";
import bcrypt from "bcrypt";
import { Groep } from "../../model/groep";

let mockLeidingRepoGetAllLeiding: jest.Mock;
let mockLeidingRepoGetLeidingById: jest.Mock;
let mockLeidingRepoCreateLeiding: jest.Mock;
let mockLeidingRepoUpdateLeiding: jest.Mock;
let mockLeidingRepoDeleteLeiding: jest.Mock;
let mockLeidingRepoGetLeidingByTotem: jest.Mock;
let mockLeidingRepoVeranderGroep: jest.Mock;
let mockGroepRepoGetGroepByNaam: jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    mockLeidingRepoGetAllLeiding = jest.fn();
    mockLeidingRepoGetLeidingById = jest.fn();
    mockLeidingRepoCreateLeiding = jest.fn();
    mockLeidingRepoUpdateLeiding = jest.fn();
    mockLeidingRepoDeleteLeiding = jest.fn();
    mockLeidingRepoGetLeidingByTotem = jest.fn();
    mockLeidingRepoVeranderGroep = jest.fn();
    mockGroepRepoGetGroepByNaam = jest.fn();

    leidingRepo.getAllLeiding = mockLeidingRepoGetAllLeiding;
    leidingRepo.getAllLeiding = mockLeidingRepoGetAllLeiding;
    leidingRepo.getLeidingById = mockLeidingRepoGetLeidingById;
    leidingRepo.createLeiding = mockLeidingRepoCreateLeiding;
    leidingRepo.updateLeiding = mockLeidingRepoUpdateLeiding;
    leidingRepo.deleteLeiding = mockLeidingRepoDeleteLeiding;
    leidingRepo.getLeidingByTotem = mockLeidingRepoGetLeidingByTotem;
    leidingRepo.veranderGroep = mockLeidingRepoVeranderGroep;
    groepRepo.getGroepByNaam = mockGroepRepoGetGroepByNaam;
});

test("getAllLeiding should return all leiding", async () => {
    const leiding = [new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" })];
    mockLeidingRepoGetAllLeiding.mockResolvedValue(leiding);

    const result = await leidingService.getAllLeiding("ADMIN");

    expect(result).toEqual(leiding.map(l => PublicLeiding.from({ leiding: l })));
    expect(mockLeidingRepoGetAllLeiding).toHaveBeenCalledTimes(1);
});

test("createLeiding should create a leiding", async () => {
    const leiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    const hashedPassword = await bcrypt.hash(leiding.getWachtwoord(), 12);
    mockLeidingRepoCreateLeiding.mockResolvedValue(leiding);

    const result = await leidingService.addLeiding(leiding, "ADMIN");

    expect(result).toEqual(PublicLeiding.from({ leiding }));
    expect(mockLeidingRepoCreateLeiding).toHaveBeenCalledTimes(1);
    expect(bcrypt.compareSync(leiding.getWachtwoord(), hashedPassword)).toBe(true);
});

test("updateLeiding should update a leiding", async () => {
    const leiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    const updatedLeiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "0987654321", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password123" });
    mockLeidingRepoGetLeidingByTotem.mockResolvedValue(leiding);
    mockLeidingRepoUpdateLeiding.mockResolvedValue(updatedLeiding);

    const result = await leidingService.updateLeiding(updatedLeiding, "ADMIN", "Eagle");

    expect(result).toEqual(PublicLeiding.from({ leiding: updatedLeiding }));
    expect(mockLeidingRepoGetLeidingByTotem).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoUpdateLeiding).toHaveBeenCalledTimes(1);
});

test("updateLeiding should throw an error if the leiding is not found", async () => {
    const leiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    mockLeidingRepoGetLeidingByTotem.mockResolvedValue(null);

    await expect(leidingService.updateLeiding(leiding, "ADMIN", "Eagle")).rejects.toThrow("Leiding not found");
    expect(mockLeidingRepoGetLeidingByTotem).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoUpdateLeiding).not.toHaveBeenCalled();
});

test("deleteLeiding should delete a leiding", async () => {
    const leiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    mockLeidingRepoGetLeidingById.mockResolvedValue(leiding);
    mockLeidingRepoDeleteLeiding.mockResolvedValue(leiding);

    await leidingService.deleteLeiding(1, "ADMIN");

    expect(mockLeidingRepoGetLeidingById).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoDeleteLeiding).toHaveBeenCalledTimes(1);
});

test("deleteLeiding should throw an error if the leiding is not found", async () => {
    mockLeidingRepoGetLeidingById.mockResolvedValue(null);

    await expect(leidingService.deleteLeiding(999, "ADMIN")).rejects.toThrow("Leiding not found");
    expect(mockLeidingRepoGetLeidingById).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoDeleteLeiding).not.toHaveBeenCalled();
});

test("updateRol should update the role of a leiding", async () => {
    const leiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    const updatedLeiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "HOOFDLEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    mockLeidingRepoGetLeidingById.mockResolvedValue(leiding);
    mockLeidingRepoUpdateLeiding.mockResolvedValue(updatedLeiding);

    const result = await leidingService.updateRol(1, "HOOFDLEIDING", "ADMIN");

    expect(result).toEqual(PublicLeiding.from({ leiding: updatedLeiding }));
    expect(mockLeidingRepoGetLeidingById).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoUpdateLeiding).toHaveBeenCalledTimes(1);
});

test("updateRol should throw an error if the leiding is not found", async () => {
    mockLeidingRepoGetLeidingById.mockResolvedValue(null);

    await expect(leidingService.updateRol(999, "HOOFDLEIDING", "ADMIN")).rejects.toThrow("Leiding not found");
    expect(mockLeidingRepoGetLeidingById).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoUpdateLeiding).not.toHaveBeenCalled();
});

test("updateRol should throw an error if the role is not authorized", async () => {
    await expect(leidingService.updateRol(1, "HOOFDLEIDING", "LEIDING")).rejects.toThrow(UnauthorizedError);
    expect(mockLeidingRepoGetLeidingById).not.toHaveBeenCalled();
    expect(mockLeidingRepoUpdateLeiding).not.toHaveBeenCalled();
});

test("updateGroep should update the groep of a leiding", async () => {
    const leiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 1, nieuwsberichten: [], wachtwoord: "password" });
    const updatedLeiding = new Leiding({ id: 1, naam: "John", voornaam: "Doe", email: "john.doe@example.com", telefoon: "1234567890", rol: "LEIDING", totem: "Eagle", groepId: 2, nieuwsberichten: [], wachtwoord: "password" });
    mockLeidingRepoGetLeidingById.mockResolvedValue(leiding);
    mockLeidingRepoVeranderGroep.mockResolvedValue(updatedLeiding);
    mockGroepRepoGetGroepByNaam.mockResolvedValue(new Groep({ id: 2, naam: "Newgroep", beschrijving: "New Beschrijving" }));    
    
    const result = await leidingService.updateGroep(1, "Newgroep", "ADMIN");

    expect(result).toEqual(PublicLeiding.from({ leiding: updatedLeiding }));
    expect(mockLeidingRepoGetLeidingById).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoVeranderGroep).toHaveBeenCalledTimes(1);
});

test("updateGroep should throw an error if the leiding is not found", async () => {
    mockLeidingRepoGetLeidingById.mockResolvedValue(null);

    await expect(leidingService.updateGroep(999, "New Groep", "ADMIN")).rejects.toThrow("Leiding not found");
    expect(mockLeidingRepoGetLeidingById).toHaveBeenCalledTimes(1);
    expect(mockLeidingRepoVeranderGroep).not.toHaveBeenCalled();
});

test("updateGroep should throw an error if the role is not authorized", async () => {
    await expect(leidingService.updateGroep(1, "New Groep", "LEIDING")).rejects.toThrow(UnauthorizedError);
    expect(mockLeidingRepoGetLeidingById).not.toHaveBeenCalled();
    expect(mockLeidingRepoVeranderGroep).not.toHaveBeenCalled();
});