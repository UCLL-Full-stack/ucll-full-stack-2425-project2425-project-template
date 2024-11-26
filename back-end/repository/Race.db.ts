import { Race } from '../model/race';
import { Driver } from '../model/driver';
import { Racecar } from '../model/racecar';
import { Crash } from '../model/crash';
import database from '../util/database';

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

const getAllRacesByNameDriver = (driverName: string) => {
    return races.filter(race => (race.getDrivers() ?? []).some(driver => driver.getName() === driverName));
}

const getRaceById = (id: number): Race | null => {
    return races.find(race => race.getId() === id) || null;
};

const getAllRacesByTypeCrash = (crashType: string) => {
    return races.filter(race => (race.getCrashes() ?? []).some(crash => crash.type === crashType));
}

const getAllRacesByCar_nameRacecar = (racecarName: string) => {
    return races.filter(race => (race.getDrivers() ?? []).some(driver => driver.getRacecar().car_name === racecarName));
}

const createRace = (race: Race): void => {
    races.push(race);
};

export default { getAllRaces, getAllRacesByNameDriver, getRaceById, getAllRacesByTypeCrash, getAllRacesByCar_nameRacecar, createRace };