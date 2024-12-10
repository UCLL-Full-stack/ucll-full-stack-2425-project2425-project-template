import { Race } from '../model/Race';
import { Crash } from '../model/crash';
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

const addCrashToRace = async (raceId: number, crashData: Crash): Promise<Race | null> => {
    try {
        // Create a new crash
        const newCrash = await database.crash.create({
            data: {
                type: crashData.getType(),
                description: crashData.getDescription(),
                casualties: crashData.getCasualties(),
                deaths: crashData.getDeaths(),
                participants: {
                    create: crashData.getParticipants()?.map(participant => ({
                        driver: {
                            connect: { id: participant.getDriver().getId() }
                        },
                        racecar: {
                            connect: { id: participant.getRacecar().getId() }
                        }
                    }))
                }
            },
            include: {
                participants: { include: { driver: true, racecar: true } }
            }
        });

        // Add the new crash to the race
        const racePrisma = await database.race.update({
            where: { id: raceId },
            data: {
                crashes: {
                    connect: { id: newCrash.id },
                },
            },
            include: {
                crashes: { include: { participants: { include: { driver: true, racecar: true } } } },
            },
        });

        return Race.from(racePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const removeCrashFromRace = async (raceId: number, crashId: number): Promise<Race | null> => {
    try {
        const racePrisma = await database.race.update({
            where: { id: raceId },
            data: {
                crashes: {
                    disconnect: { id: crashId },
                },
            },
            include: {
                crashes: { include: { participants: { include: { driver: true, racecar: true } } } },
            },
        });
        return Race.from(racePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const editCrash = async (crashId: number, crashData: Partial<Crash>): Promise<Crash | null> => {
    try {
        const crashPrisma = await database.crash.update({
            where: { id: crashId },
            data: crashData,
            include: {
                participants: { include: { driver: true, racecar: true } },
            },
        });
        return Crash.from(crashPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default { addCrashToRace, removeCrashFromRace, editCrash, getAllRaces, getRaceById, createRace };