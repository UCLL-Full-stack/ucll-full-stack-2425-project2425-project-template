import { Crash } from '../model/crash';
import database from '../util/database';

const getAllCrashes = async (): Promise<Crash[] | null> => {
    try {
        const crashPrisma = await database.crash.findMany();
        return crashPrisma ? crashPrisma.map(crash => Crash.from(crash)) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}


const getCrashById =  async ({ id }: { id: number }): Promise<Crash | null> => {
    try {
        const crashPrisma = await database.crash.findFirst({
            where: { id },
        });
        return crashPrisma ? Crash.from(crashPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}

const createCrash = (crash: Crash): void => {
    try {
        database.crash.create({
            data: {
                type: crash.type,
                description: crash.description,
                casualties: crash.casualties,
                deaths: crash.deaths,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default { getAllCrashes, createCrash, getCrashById };