import { Race } from '../model/Race';
import { Driver } from '../model/Driver';
import { Racecar } from '../model/Racecar';
import { Crash } from '../model/Crash';
import { Admin } from '../model/Admin';
import raceDb from '../repository/Race.db';
import driverDb from '../repository/Driver.db';
import racecarDb from '../repository/Racecar.db';
import crashDb from '../repository/Crash.db';
import adminDb from '../repository/Admin.db';
import { RaceInput, DriverInput, CrashInput } from '../types';
import RaceDb from '../repository/Race.db';

const getAllRaces = (): Race[] => {
    return raceDb.getAllRaces();
}

const getRaceById = (id: number): Race | null => {
    return raceDb.getRaceById(id);
};

const createRace = (raceInput: RaceInput): Race => {
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

    const drivers = raceInput.drivers.map((driverInput: DriverInput) => {
        const racecar = new Racecar({
            id: driverInput.racecar.id,
            car_name: driverInput.racecar.car_name,
            type: driverInput.racecar.type,
            description: driverInput.racecar.description,
            hp: driverInput.racecar.hp,
        });

        const crash = new Crash({
            id: driverInput.crash.id,
            type: driverInput.crash.type,
            description: driverInput.crash.description,
            casualties: driverInput.crash.casualties,
            deaths: driverInput.crash.deaths,
        });

        return new Driver({
            id: driverInput.id,
            name: driverInput.name,
            team: driverInput.team,
            description: driverInput.description,
            age: driverInput.age,
            racecar,
            crash,
        });
    });

    const crashes = raceInput.crashes.map((crashInput: CrashInput) => {
        return new Crash({
            id: crashInput.id,
            type: crashInput.type,
            description: crashInput.description,
            casualties: crashInput.casualties,
            deaths: crashInput.deaths,
        });
    });

    let admin: Admin | undefined;
    if (raceInput.admin && raceInput.admin.id !== undefined) {
        admin = adminDb.getAdminById(raceInput.admin.id);
        if (!admin) {
            throw new Error(`Admin not found with ID ${raceInput.admin.id}`);
        }
    }

    const newRace = new Race({
        id: raceInput.id,
        name: raceInput.name,
        type: raceInput.type,
        description: raceInput.description,
        location: raceInput.location,
        drivers,
        crashes,
        admin,
    });

    raceDb.createRace(newRace);
    return newRace;
};

const getAllCrashes = (): Crash[] => {
    return crashDb.getAllCrashes();
}

const createCrash = (crashInput: any): Crash => {
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

    const newCrash = new Crash({
        type: crashInput.type,
        description: crashInput.description,
        casualties: crashInput.casualties,
        deaths: crashInput.deaths,
    });

    crashDb.createCrash(newCrash);
    return newCrash;
};

const getAllRacecars = (): Racecar[] => {
    return racecarDb.getAllRacecars();
}

const createRacecar = (racecarInput: any): Racecar => {
    if (!racecarInput.car_name) {
        throw new Error('Car name is required');
    }
    if (!racecarInput.type) {
        throw new Error('Type is required');
    }
    if (!racecarInput.description) {
        throw new Error('Description is required');
    }
    if (racecarInput.hp === undefined) {
        throw new Error('Horsepower is required');
    }

    const newRacecar = new Racecar({
        car_name: racecarInput.car_name,
        type: racecarInput.type,
        description: racecarInput.description,
        hp: racecarInput.hp,
    });

    racecarDb.createRacecar(newRacecar);
    return newRacecar;
};

const getAllDrivers = (): Driver[] => {
    return driverDb.getAllDrivers();
}

const createDriver = (driverInput: any): Driver => {
    if (!driverInput.name) {
        throw new Error('Driver name is required');
    }
    if (!driverInput.team) {
        throw new Error('Team is required');
    }
    if (!driverInput.description) {
        throw new Error('Description is required');
    }
    if (driverInput.age === undefined) {
        throw new Error('Age is required');
    }
    if (!driverInput.racecar) {
        throw new Error('Racecar is required');
    }
    if (!driverInput.crash) {
        throw new Error('Crash is required');
    }

    const newDriver = new Driver({
        name: driverInput.name,
        team: driverInput.team,
        description: driverInput.description,
        age: driverInput.age,
        racecar: driverInput.racecar,
        crash: driverInput.crash,
    });

    driverDb.createDriver(newDriver);
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