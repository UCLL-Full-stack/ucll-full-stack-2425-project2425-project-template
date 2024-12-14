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
        throw new Error("Something went wrong with getting leiding by id");
    }
}

const createLeiding = async (leiding: Leiding): Promise<Leiding> => {
    try {
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
                    connect: { id: 1 }
                },
            }
        });
        return Leiding.from({ ...leidingPrisma, nieuwsberichten: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with creating leiding");
    }
}

const updateLeiding = async (leiding: Leiding, groep?: Groep): Promise<Leiding> => {
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
                wachtwoord: leiding.getWachtwoord(),
                groep: {
                    connect: { id: groep?.id }
                }
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

export default {
    getAllLeiding,
    getLeidingById,
    createLeiding,
    updateLeiding,
    deleteLeiding
}