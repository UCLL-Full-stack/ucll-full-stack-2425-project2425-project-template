import { Race } from '../model/race';
import database from '../util/database';

const createRace = async ({ race }: { race: Race }): Promise<Race> => {
    try {
        const racePrisma = await database.race.create({
            data: {
                name: race.getName(),
                type: race.getType(),
                description: race.getDescription(),
                location: race.getLocation(),
                date: race.getDate(),
                crashes: {
                    connect: race.getCrashes().map((crash) => ({ id: crash.getId()})),
                },
            },
            include: {
                crashes: { include: { participants: { include : { driver: true, racecar: true } } } },
            },
        });

        return Race.from(racePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getAllRaces = async (): Promise<Race[] | null> => {
    try {
        const racePrisma = await database.race.findMany({
            include: {
                crashes: { include: { participants: { include : { driver: true, racecar: true } } } },
            },
        });
        return racePrisma.map((racePrisma) => Race.from(racePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}

const getRaceById = async (id: number): Promise<Race | null> => {
    try {
        const racePrisma = await database.race.findFirst({
            where: { id },
            include: {
                crashes: { include: { participants: { include : { driver: true, racecar: true } } } },
            },
        });
        return racePrisma ? Race.from(racePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default { getAllRaces, getRaceById, createRace };