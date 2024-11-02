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
    birthday: new Date(2000, 1, 1), // sorry cedric I don't know your bday :(
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
