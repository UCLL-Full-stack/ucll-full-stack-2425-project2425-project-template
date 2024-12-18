import { Bestelling } from "../model/bestelling";
import database from "../util/database";

const createBestelling = async (bestelling: Bestelling): Promise<Bestelling> => {
    try {
        const bestellingenPrisma = await database.bestelling.create({
            data: {
                user: {
                    connect: { id: bestelling.getUser().getId() }
                },
                pokebowls: {
                    connect: bestelling.getPokebowls().map((pokebowl) => ({
                        id: pokebowl.getId()
                    }))
                }
            },
            include: {
                user: true,
                pokebowls: true,
            },
        });

        return Bestelling.from(bestellingenPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
};

const getAllBestellingen = async (): Promise<Bestelling[]> => {
    try {
        const bestellingenPrisma = await database.bestelling.findMany({
            include: {
                user: true,
                pokebowls: true
            },
            orderBy: {
                datum: 'desc'
            }
        });
        console.log(bestellingenPrisma.map((bestellingPrisma) => Bestelling.from(bestellingPrisma)));
        return bestellingenPrisma.map((bestellingPrisma) => Bestelling.from(bestellingPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }

};


const getBestellingById = async ({ id }: { id: number }): Promise<Bestelling | null> => {
    try {
        const bestellingenPrisma = await database.bestelling.findUnique({
            where: {
                id: id
            }, include: {
                user: true,
                pokebowls: true
            },
        });
        if (bestellingenPrisma == null) {
            return null;
        }
        return Bestelling.from(bestellingenPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
}

const getBestellingenByUser = async ({ id }: { id: number }): Promise<Bestelling[]> => {
    try {
        const bestellingenPrisma = await database.bestelling.findMany({
            where: {
                user: { id: id }
            }, include: {
                user: true,
                pokebowls: true
            }, orderBy: {
                datum: 'desc'
            },
        });
        return bestellingenPrisma.map((bestellingPrisma) => Bestelling.from(bestellingPrisma));
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
}

export default { getAllBestellingen, getBestellingById, getBestellingenByUser, createBestelling };