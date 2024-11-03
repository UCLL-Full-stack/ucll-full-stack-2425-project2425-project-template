import { Player } from '../model/player';
import { User } from '../model/user';
/* 

SETUP

*/
const xander = new User({
    name: 'Xander',
    email: 'xander.dhondt@student.ucll.be',
    password: '1234',
    birthday: new Date(2004, 2, 18),
});
const cedric = new User({
    name: 'Cedric',
    email: 'cedric.somethingiforgor@student.ucll.be',
    password: '5678',
    birthday: new Date(2004, 5, 17),
});
const johan = new User({
    name: 'Johan',
    email: 'johan.pieck@teacher.ucll.be',
    password: '8080',
    birthday: new Date(2000, 1, 1), // sorry johan I don't know your bday :(
});
const milan = new User({
    name: 'Milan',
    email: 'milan.storms@student.ucll.be',
    password: '6969',
    birthday: new Date(2005, 6, 11),
});
const dean = new User({
    name: 'Dean',
    email: 'dean.duraku@student.ucll.be',
    password: '1984',
    birthday: new Date(2005, 12, 1),
});

const players = [
    new Player({
        id: 1,
        name: 'Alnea Starholt',
        statistics: 'hp: 10, power: 9000+',
        class: 'Red Mage',
        currency: 10000,
        user: xander,
    }),
    new Player({
        id: 2,
        name: 'Cedinvu',
        statistics: 'hp: 20, power: veel',
        class: 'JAS 39 Gripen',
        currency: 2389,
        user: cedric,
    }),
    new Player({
        id: 3,
        name: 'Cedinvu2',
        statistics: 'hp: 2000, power: -1',
        class: 'Impostor',
        currency: 100004,
        user: cedric,
    }),
    new Player({
        id: 4,
        name: 'Cedriciscool',
        statistics: 'hp: 100, power: 100',
        class: 'Warrior',
        currency: 1454,
        user: cedric,
    }),
    new Player({
        id: 5,
        name: 'MasterPieck',
        statistics: 'hp: 2000, power: 1500',
        class: 'Teacher',
        currency: 15474,
        user: johan,
    }),
    new Player({
        id: 6,
        name: 'Storm',
        statistics: 'hp: 50, power: 50',
        class: 'Skier',
        currency: 457532,
        user: milan,
    }),
    new Player({
        id: 7,
        name: 'Wild',
        statistics: 'hp: 87, power: 147',
        class: 'Monkey',
        currency: 0,
        user: milan,
    }),
    new Player({
        id: 8,
        name: 'Epstein',
        statistics: 'hp: 64, power: 455',
        class: 'Child Trafficker',
        currency: 42453,
        user: milan,
    }),
    new Player({
        id: 9,
        name: 'Deanbanaan1234',
        statistics: 'hp: 37, power: 463',
        class: 'Boxer',
        currency: 9786,
        user: dean,
    }),
    new Player({
        id: 10,
        name: 'Dracula',
        statistics: 'hp: 2000, power: 5000',
        class: 'Vampire',
        currency: 69420,
        user: dean,
    }),
    new Player({
        id: 11,
        name: 'Bean',
        statistics: 'hp: 2, power: -1',
        class: 'Beggar',
        currency: 4,
        user: dean,
    }),
];

/* 

FUNCTIONALITY

*/

const getAllPlayers = (): Player[] => {
    return players;
};

const getPlayerById = (id: number): Player => {
    const player = players.find((player) => player.getId() === id);
    if (!player) {
        throw new Error(`player with id ${id} does not exist.`);
    }
    return player;
};

export default {
    getAllPlayers,
    getPlayerById,
};
