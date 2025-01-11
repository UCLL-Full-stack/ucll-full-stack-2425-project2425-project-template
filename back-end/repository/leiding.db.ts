import { Groep } from "@prisma/client";
import {Leiding} from "../model/leiding";
import database from "../util/database";

const getAllLeiding = async (): Promise<Leiding[]> => {
    try {
        const userPrisma = await database.leiding.findMany();
        return userPrisma.map((userPrisma) => Leiding.from({ ...userPrisma, nieuwsberichten: [] }));
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with getting all leiding");
    }
}

const getLeidingById = async ({id}: {id: number}): Promise<Leiding> => {
    try {
        const userPrisma = await database.leiding.findUnique({
            where: {
                id: id
            }
        });
        if (!userPrisma) {
            throw new Error("Leiding not found");
        }
        return Leiding.from({ ...userPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const getLeidingByTotem = async ({totem}: {totem: string}): Promise<Leiding> => {
    try {
        const userPrisma = await database.leiding.findUnique({
            where: {
                totem: totem
            }
        });
        if (!userPrisma) {
            throw new Error("Leiding not found");
        }
        return Leiding.from({ ...userPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const createLeiding = async (leiding: Leiding): Promise<Leiding> => {
    try {
        const groepPrisma = await database.groep.findFirst({
            where: {
                naam: "Losse leden"
            }
        });
        if (!groepPrisma) {
            throw new Error("Groep not found");
        }
        const leidingPrisma = await database.leiding.create({
            data: {
                naam: leiding.getNaam(),
                voornaam: leiding.getVoornaam(),
                email: leiding.getEmail(),
                telefoon: leiding.getTelefoon(),
                rol: leiding.getRol(),
                totem: leiding.getTotem(),
                wachtwoord: leiding.getWachtwoord(),
                groep: {
                    connect: { id: groepPrisma.id }
                },
            }
        });
        return Leiding.from({ ...leidingPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const updateLeiding = async (leiding: Leiding): Promise<Leiding> => {
    try {
        const leidingPrisma = await database.leiding.update({
            where: {
                id: leiding.getId()
            },
            data: {
                naam: leiding.getNaam(),
                voornaam: leiding.getVoornaam(),
                email: leiding.getEmail(),
                telefoon: leiding.getTelefoon(),
                rol: leiding.getRol(),
                totem: leiding.getTotem(),
                wachtwoord: leiding.getWachtwoord()
            }
        });
        return Leiding.from({ ...leidingPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const updateLeidingNoPass = async (leiding: Leiding): Promise<Leiding> => {
    try {
        const leidingPrisma = await database.leiding.update({
            where: {
                id: leiding.getId()
            },
            data: {
                naam: leiding.getNaam(),
                voornaam: leiding.getVoornaam(),
                email: leiding.getEmail(),
                telefoon: leiding.getTelefoon(),
                rol: leiding.getRol(),
                totem: leiding.getTotem()
            }
        });
        return Leiding.from({ ...leidingPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with updating leiding");
    }
}

const deleteLeiding = async ({id}: {id: number}): Promise<Leiding> => {
    try {
        const leidingPrisma = await database.leiding.delete({
            where: {
                id: id
            }
        });
        return Leiding.from({ ...leidingPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with deleting leiding");
    }
}

const veranderGroep = async (leiding: Leiding, id: number): Promise<Leiding> => {
    try {
        const leidingPrisma = await database.leiding.update({
            where: {
                id: leiding.getId()
            },
            data: {
                groep: {
                    connect: { id: id }
                }
            }
        });
        return Leiding.from({ ...leidingPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with updating leiding");
    }
}

export default {
    getAllLeiding,
    getLeidingById,
    createLeiding,
    updateLeiding,
    deleteLeiding,
    getLeidingByTotem,
    updateLeidingNoPass,
    veranderGroep
}