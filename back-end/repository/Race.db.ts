import { Race } from '../model/Race';
import { Driver } from '../model/Driver';
import { Racecar } from '../model/Racecar';
import { Crash } from '../model/Crash';
import { Admin } from '../model/Admin';

const races = [
    new Race({
        id: 1,
        name: 'Grand Prix Monaco',
        type: 'Formula 1',
        description: 'A high-speed race',
        location: 'Monaco',
        drivers: [
            new Driver({
                name: 'Lewis Hamilton',
                team: 'Mercedes',
                description: 'A skilled driver',
                age: 36,
                racecar: new Racecar({
                    car_name: 'Mercedes W12',
                    type: 'Formula 1',
                    description: 'A fast racecar',
                    hp: 1000
                }),
                crash: new Crash({
                    type: 'Collision',
                    description: 'A severe crash',
                    casualties: 5,
                    deaths: 2
                })
            })
        ],
        crashes: [
            new Crash({
                type: 'Collision',
                description: 'A severe crash',
                casualties: 5,
                deaths: 2
            })
        ],
        admin: new Admin({ username: 'adminuser', password: 'adminpassword' })
    }),
    new Race({
        id: 2,
        name: 'Grand Prix Silverstone',
        type: 'Formula 1',
        description: 'A historic race',
        location: 'Silverstone',
        drivers: [
            new Driver({
                name: 'Max Verstappen',
                team: 'Red Bull',
                description: 'A competitive driver',
                age: 24,
                racecar: new Racecar({
                    car_name: 'Red Bull RB16B',
                    type: 'Formula 1',
                    description: 'A powerful racecar',
                    hp: 1050
                }),
                crash: new Crash({
                    type: 'Collision',
                    description: 'A minor crash',
                    casualties: 0,
                    deaths: 0
                })
            })
        ],
        crashes: [
            new Crash({
                type: 'Collision',
                description: 'A minor crash',
                casualties: 0,
                deaths: 0
            })
        ],
        admin: new Admin({ username: 'adminuser2', password: 'adminpassword2' })
    }),
];

const getAllRaces = (): Race[] => {
    return races;
}

const getAllRacesByNameDriver = (driverName: string) => {
    return races.filter(race => (race.getDrivers() ?? []).some(driver => driver.getName() === driverName));
}

const getRaceById = (id: number): Race | null => {
    return races.find(race => race.getId() === id) || null;
};

const getAllRacesByTypeCrash = (crashType: string) => {
    return races.filter(race => (race.getCrashes() ?? []).some(crash => crash.getType() === crashType));
}

const getAllRacesByCar_nameRacecar = (racecarName: string) => {
    return races.filter(race => (race.getDrivers() ?? []).some(driver => driver.getRacecar().getCarName() === racecarName));
}

const createRace = (race: Race): void => {
    races.push(race);
};

export default { getAllRaces, getAllRacesByNameDriver, getRaceById, getAllRacesByTypeCrash, getAllRacesByCar_nameRacecar, createRace };