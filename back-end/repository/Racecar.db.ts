import { Racecar } from '../model/racecar';
import database from '../util/database';

const getAllRacecars = async (): Promise<Racecar[] | null> => {
    try {
        const racecarPrisma = await database.racecar.findMany();
        return racecarPrisma ? racecarPrisma.map(racecar => Racecar.from(racecar)) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}

const createRacecar = async ({ racecar }: { racecar: Racecar }): Promise<Racecar | null> => {
    try {
        const racecarPrisma = await database.racecar.create({
            data: {
                name: racecar.getName(),
                type: racecar.getType(),
                brand: racecar.getBrand(),
                hp: racecar.getHp(),
            },
        });

        return Racecar.from(racecarPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}

export default { getAllRacecars, createRacecar };