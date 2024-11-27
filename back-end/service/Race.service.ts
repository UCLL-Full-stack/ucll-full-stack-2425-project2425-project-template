import { Race } from '../model/race';
import { Driver } from '../model/driver';
import { Racecar } from '../model/racecar';
import { Crash } from '../model/crash';
import raceDb from '../repository/race.db';
import driverDb from '../repository/driver.db';
import racecarDb from '../repository/racecar.db';
import crashDb from '../repository/crash.db';
import { RaceInput, CrashInput, ParticipantInput, DriverInput, RacecarInput } from '../types';
import RaceDb from '../repository/race.db';
import { User } from '@prisma/client';
import { Participant } from '../model/participant';

const getAllRaces = async (): Promise<Race[] | null> => {
    return raceDb.getAllRaces();
}

const getRaceById = async (id: number): Promise<Race | null> => {
    return raceDb.getRaceById(id);
};

const createRace = async (raceInput: RaceInput): Promise<Race> => {
    // error handling
    if (!raceInput.name) {
        throw new Error('Race name is required');
    }
    if (!raceInput.type) {
        throw new Error('Race type is required');
    }
    if (!raceInput.description) {
        throw new Error('Race description is required');
    }
    if (!raceInput.location) {
        throw new Error('Race location is required');
    }

    const crashes = (raceInput.crashes || []).map((crashInput: CrashInput) => {

        const participants = crashInput.participants.map((participantInput: ParticipantInput) => {
            const driver =  new Driver({
                name: participantInput.driver.name,
                surname: participantInput.driver.surname,
                birthdate: participantInput.driver.birthdate,
                team: participantInput.driver.team,
                country: participantInput.driver.country,
                description: participantInput.driver.description,
            });

            const racecar = new Racecar({
                name: participantInput.racecar.car_name,
                type: participantInput.racecar.type,
                brand: participantInput.racecar.brand,
                hp: participantInput.racecar.hp,
            });

            return new Participant({
                driver: driver,
                racecar: racecar,
            });
        });
        
        return new Crash({
            id: crashInput.id,
            type: crashInput.type,
            description: crashInput.description,
            casualties: crashInput.casualties,
            deaths: crashInput.deaths,
            participants: participants,
        });
    });

    const newRace = new Race({
        id: raceInput.id,
        name: raceInput.name,
        type: raceInput.type,
        description: raceInput.description,
        location: raceInput.location,
        date: raceInput.date,
        crashes,
    });

    raceDb.createRace({ race: newRace });
    return newRace;
};

const getAllCrashes = async (): Promise<Crash[] | null> => {
    return await crashDb.getAllCrashes();
}

const createCrash = async (crashInput: CrashInput): Promise<Crash> => {
    if (!crashInput.type) {
        throw new Error('Crash type is required');
    }
    if (!crashInput.description) {
        throw new Error('Crash description is required');
    }
    if (crashInput.casualties === undefined) {
        throw new Error('Casualties are required');
    }
    if (crashInput.deaths === undefined) {
        throw new Error('Deaths are required');
    }

    const participants = crashInput.participants.map((participantInput: ParticipantInput) => {
        const driver = new Driver({
            name: participantInput.driver.name,
            surname: participantInput.driver.surname,
            birthdate: participantInput.driver.birthdate,
            team: participantInput.driver.team,
            country: participantInput.driver.country,
            description: participantInput.driver.description,
        });

        const racecar = new Racecar({
            name: participantInput.racecar.car_name,
            type: participantInput.racecar.type,
            brand: participantInput.racecar.brand,
            hp: participantInput.racecar.hp,
        });

        return new Participant({
            driver: driver,
            racecar: racecar,
        });
    });

    const newCrash = new Crash({
        type: crashInput.type,
        description: crashInput.description,
        casualties: crashInput.casualties,
        deaths: crashInput.deaths,
        participants: participants,
    });

    crashDb.createCrash({ crash: newCrash });
    return newCrash;
};

const getAllRacecars = async (): Promise<Racecar[] | null> => {
    return await racecarDb.getAllRacecars();
}

const createRacecar = async (racecarInput: RacecarInput): Promise<Racecar> => {
    if (!racecarInput.car_name) {
        throw new Error('Car name is required');
    }
    if (!racecarInput.type) {
        throw new Error('Type is required');
    }
    if (!racecarInput.brand) {
        throw new Error('Brand is required');
    }
    if (racecarInput.hp === undefined) {
        throw new Error('Horsepower is required');
    }

    const newRacecar = new Racecar({
        name: racecarInput.car_name,
        type: racecarInput.type,
        brand: racecarInput.brand,
        hp: racecarInput.hp,
    });

    racecarDb.createRacecar({ racecar: newRacecar });
    return newRacecar;
};

const getAllDrivers = async (): Promise<Driver[] | null> => {
    return driverDb.getAllDrivers();
}

const createDriver = async (driverInput: DriverInput): Promise<Driver> => {
    if (!driverInput.name) {
        throw new Error('Driver name is required');
    }
    if (!driverInput.surname) {
        throw new Error('Driver surname is required');
    }
    if (!driverInput.birthdate) {
        throw new Error('Driver birthdate is required');
    }
    if (driverInput.team === undefined) {
        throw new Error('Driver team is required');
    }
    if (!driverInput.country) {
        throw new Error('Driver country is required');
    }
    if (!driverInput.description) {
        throw new Error('Driver description is required');
    }

    const newDriver = new Driver({
        name: driverInput.name,
        surname: driverInput.surname,
        birthdate: driverInput.birthdate,
        team: driverInput.team,
        country: driverInput.country,
        description: driverInput.description,
    });

    driverDb.createDriver({ driver: newDriver });
    return newDriver;
};

const updateRace = (id: number, raceInput: RaceInput) => {
    const oldRace = getRaceById(id);
    if (!oldRace) {
        throw new Error(`Race not found with ID ${id}`);
    }
    createRace(raceInput);
}

export default {
    getRaceById,
    getAllRaces,
    createRace,
    getAllCrashes,
    createCrash,
    getAllRacecars,
    createRacecar,
    getAllDrivers,
    createDriver,
    updateRace,
};