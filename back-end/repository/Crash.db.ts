import { Crash } from '../model/Crash';
import database from '../util/database';

const createCrash = async ({ crash }: { crash: Crash }): Promise<Crash> => {
    try {
        const crashPrisma = await database.crash.create({
            data: {
                type: crash.getType(),
                description: crash.getDescription(),
                casualties: crash.getCasualties(),
                deaths: crash.getDeaths(),
            },
            include: {
                participants: { include: { driver: true, racecar: true }},
            },
        });

        return Crash.from(crashPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getCrashById = async ({ id }: { id: number }): Promise<Crash | null> => {
    try {
        const crashPrisma = await database.crash.findFirst({
            where: { id },
            include: {
                participants: { include: { driver: true, racecar: true } },
            },
        });
        return crashPrisma ? Crash.from(crashPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getAllCrashes = async (): Promise<Crash[]> => {
    try {
        const crashesPrisma = await database.crash.findMany({
            include: {
                participants: { include: { driver: true, racecar: true } },
            },
        });
        return crashesPrisma.map(crashPrisma => Crash.from(crashPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default { createCrash, getCrashById, getAllCrashes };