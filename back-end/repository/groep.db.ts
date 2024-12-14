import { Activiteit } from "../model/activiteit";
import { Groep } from "../model/groep";
import database from "../util/database";
import { Leiding } from "../model/leiding";


const createGroep = async (groep: Groep): Promise<Groep> => {
    try {
        const groepPrisma = await database.groep.create({
            data: {
                naam: groep.getNaam(),
                beschrijving: groep.getBeschrijving()
            }
        });
        return Groep.from({ ...groepPrisma, activiteiten: [], leiding: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with creating groep");
    }
}

const getAllGroepen = async (): Promise<Groep[]> => {
    try {
        const groepenPrisma = await database.groep.findMany();
        return groepenPrisma.map((groepPrisma) => Groep.from({ ...groepPrisma, activiteiten: [], leiding: [] }));
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with getting all groepen");
    }
}

const getGroepById = async ({ id }: { id: number }): Promise<Groep> => {
    try {
        const groepPrisma = await database.groep.findUnique({
            where: {
                id: id
            }
        });
        if (!groepPrisma) {
            throw new Error("Groep not found");
        }
        return Groep.from({ ...groepPrisma, activiteiten: [], leiding: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with getting groep by id");
    }
}

const getGroepByNaam = async ({naam}: {naam: string}): Promise<Groep> => {
    try {
        const groepPrisma = await database.groep.findFirst({
            where: {
                naam: naam
            }
        });
        if (!groepPrisma) {
            throw new Error("Groep not found");
        }
        return Groep.from({ ...groepPrisma, activiteiten: [], leiding: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with getting groep by naam");
    }
}

const addActiviteitToGroep = async ({activiteit, groep}: {activiteit: Activiteit, groep: Groep}): Promise<Groep> => {
    try {
        const groepPrisma = await database.groep.update({
            where: {
                id: groep.getId()
            },
            data: {
                activiteiten: {
                    connect: { id: activiteit.getId() }
                }
            }
        });
        return Groep.from({ ...groepPrisma, activiteiten: [], leiding: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with adding activiteit to groep");
    }
}

const addLeidingToGroep = async (leiding: Leiding, groep: Groep): Promise<Groep> => {
    try {
        const groepPrisma = await database.groep.update({
            where: {
                id: groep.getId()
            },
            data: {
                leiding: {
                    connect: { id: leiding.getId() }
                }
            }
        });
        return Groep.from({ ...groepPrisma, activiteiten: [], leiding: [] });
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with adding leiding to groep");
    }
}

const getLeidingByGroep = async (groep: Groep): Promise<Leiding[]> => {
    try {
        const groepPrisma = await database.groep.findFirst({
            where: {
                id: groep.getId()
            },
            include: {
                leiding: true
            }
        });
        if (!groepPrisma) {
            throw new Error("Groep not found");
        }
        const leidingPrisma = groepPrisma.leiding;
        return leidingPrisma.map((leiding) => Leiding.from({ ...leiding, nieuwsberichten: [] }));
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with getting leiding by groep");
    }
}

const getActiviteitenByGroep = async (groep: Groep): Promise<Activiteit[]> => {
    try {
        const groepPrisma = await database.groep.findFirst({
            where: {
                id: groep.getId()
            },
            include: {
                activiteiten: true
            }
        });
        if (!groepPrisma) {
            throw new Error("Groep not found");
        }
        const activiteitenPrisma = groepPrisma.activiteiten;
        return activiteitenPrisma.map((activiteit) => Activiteit.from({ ...activiteit, begindatum: activiteit.beginDatum, einddatum: activiteit.eindDatum }));
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong with getting activiteiten by groep");
    }
}

export default {createGroep, getAllGroepen, getGroepById, getGroepByNaam, addActiviteitToGroep, addLeidingToGroep, getLeidingByGroep, getActiviteitenByGroep};

