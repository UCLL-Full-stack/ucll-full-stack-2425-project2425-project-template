import { Race } from '../model/Race';
import { Crash } from '../model/Crash';
import database from '../util/database';
import { Prisma } from '@prisma/client';

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
        // Create participants with their drivers and racecars
        const participants = await Promise.all(crashData.getParticipants()?.map(async participant => {
            const birthdate = participant.getDriver().getBirthdate();
            const birthdateISO = birthdate instanceof Date ? birthdate.toISOString() : new Date(birthdate).toISOString();

            const driver = await database.driver.create({
                data: {
                    name: participant.getDriver().getName(),
                    surname: participant.getDriver().getSurname(),
                    birthdate: birthdateISO,
                    team: participant.getDriver().getTeam(),
                    country: participant.getDriver().getCountry(),
                    description: participant.getDriver().getDescription(),
                }
            });

            const racecar = await database.racecar.create({
                data: {
                    name: participant.getRacecar().getName(),
                    type: participant.getRacecar().getType(),
                    brand: participant.getRacecar().getBrand(),
                    hp: participant.getRacecar().getHp(),
                }
            });

            return {
                driver: { connect: { id: driver.id } },
                racecar: { connect: { id: racecar.id } }
            };
        }) || []);

        // Create a new crash
        const newCrash = await database.crash.create({
            data: {
                type: crashData.getType(),
                description: crashData.getDescription(),
                casualties: crashData.getCasualties(),
                deaths: crashData.getDeaths(),
                participants: {
                    create: participants
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
        console.error('Error adding crash to race:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('Prisma error code:', error.code);
        }
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

const editCrash = async (crashId: number, crashData: Crash): Promise<Crash | null> => {
    try {
        // Delete the existing crash
        await database.crash.delete({
            where: { id: crashId },
        });

        // Create participants with their drivers and racecars
        const participants = await Promise.all(crashData.getParticipants()?.map(async participant => {
            const birthdate = participant.getDriver().getBirthdate();
            const birthdateISO = birthdate instanceof Date ? birthdate.toISOString() : new Date(birthdate).toISOString();

            const driver = await database.driver.create({
                data: {
                    name: participant.getDriver().getName(),
                    surname: participant.getDriver().getSurname(),
                    birthdate: birthdateISO,
                    team: participant.getDriver().getTeam(),
                    country: participant.getDriver().getCountry(),
                    description: participant.getDriver().getDescription(),
                }
            });

            const racecar = await database.racecar.create({
                data: {
                    name: participant.getRacecar().getName(),
                    type: participant.getRacecar().getType(),
                    brand: participant.getRacecar().getBrand(),
                    hp: participant.getRacecar().getHp(),
                }
            });

            return {
                driver: { connect: { id: driver.id } },
                racecar: { connect: { id: racecar.id } }
            };
        }) || []);

        // Create a new crash
        const newCrash = await database.crash.create({
            data: {
                type: crashData.getType(),
                description: crashData.getDescription(),
                casualties: crashData.getCasualties(),
                deaths: crashData.getDeaths(),
                participants: {
                    create: participants
                }
            },
            include: {
                participants: { include: { driver: true, racecar: true } }
            }
        });

        return Crash.from(newCrash);
    } catch (error) {
        console.error('Error editing crash:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('Prisma error code:', error.code);
        }
        throw new Error('Database error. See server logs for details.');
    }
};

export default { addCrashToRace, removeCrashFromRace, editCrash, getAllRaces, getRaceById, createRace };