import { Driver } from '../model/Driver';
import { Racecar } from '../model/Racecar';
import { Crash } from '../model/Crash';

const drivers = [
    new Driver({
        id: 1,
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
    }),
    new Driver({
        id: 2,
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
    }),
];

const getAllDrivers = (): Driver[] => {
    return drivers;
}

const getDriverById = (id: number): Driver | undefined | null => {
    return drivers.find(driver => driver.getId() === id) || null;
}

const createDriver = (driver: Driver): void => {
    drivers.push(driver);
};

export default { getAllDrivers, createDriver, getDriverById };