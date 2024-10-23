import { Player } from '../model/player';

const players = [
    new Player({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@ucll.be',
        phoneNumber: '0423456789',
    }),
    new Player({
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@ucll.be',
        phoneNumber: '0476543210',
    }),
    new Player({
        id: 3,
        firstName: 'Alice',
        lastName: 'Wonderland',
        email: 'alicewonderland',
        phoneNumber: '0498765432',
    }),
    new Player({
        id: 4,
        firstName: 'Bob',
        lastName: 'Builder',
        email: 'bobbuilder@ucll.be',
        phoneNumber: '0487654321',
    }),
];

const getAllPlayers = (): Player[] => {
    return players;
};

const getPlayerById = (id: number): Player | undefined => {
    try {
        return players.find((player) => player.getId() === id) || undefined;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default { getAllPlayers, getPlayerById };
