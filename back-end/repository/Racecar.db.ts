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

const createRacecar = (racecar: Racecar): void => {
    try {
        database.racecar.create({
            data: {
                car_name: racecar.car_name,
                type: racecar.type,
                description: racecar.description,
                hp: racecar.hp,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default { getAllRacecars, createRacecar };