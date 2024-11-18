import { Crash } from '../model/crash';
import { Racecar } from '../model/racecar';

const crashes = [
    new Crash({
        id: 1,
        type: "Collision",
        description: 'Crash at turn 3',
        casualties: 2,
        deaths: 1,
    }),
    new Crash({
        id: 2,
        type: "Collision",
        description: 'Crash at turn 5',
        casualties: 3,
        deaths: 0,
    }),
];

const getAllCrashes = (): Crash[] => {
    return crashes;
}

const getCrashById = (id: number): Crash | undefined => {
    return crashes.find(crash => crash.getId() === id);
}

const createCrash = (crash: Crash): void => {
    crashes.push(crash);
};

export default { getAllCrashes, createCrash, getCrashById };