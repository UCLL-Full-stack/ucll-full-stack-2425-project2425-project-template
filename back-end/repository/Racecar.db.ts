import { Racecar } from '../model/Racecar';

const racecars = [
    new Racecar({
        id: 1,
        car_name: 'Mercedes W12',
        type: 'Formula 1',
        description: 'A fast racecar',
        hp: 1000
    }),
    new Racecar({
        id: 2,
        car_name: 'Red Bull RB16B',
        type: 'Formula 1',
        description: 'A powerful racecar',
        hp: 1050
    }),
];

const getAllRacecars = (): Racecar[] => {
    return racecars;
}

const createRacecar = (racecar: Racecar): void => {
    racecars.push(racecar);
};

export default { getAllRacecars, createRacecar };