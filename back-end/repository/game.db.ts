import { Coach } from '../model/coach';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { Team } from '../model/team';

const games = [
    new Game({
        id: 1,
        date: new Date('2021-10-01'),
        result: '1-1',
        teams: [
            new Team({
                id: 1,
                teamName: 'Team 1',
                players: [
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
                ],
                coach: new Coach({
                    id: 1,
                    firstName: 'Jason',
                    lastName: 'Bourne',
                    email: 'jasonbourne@ucll.be',
                    phoneNumber: '0423456789',
                }),
            }),
            new Team({
                id: 2,
                teamName: 'Team 2',
                players: [
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
                ],
                coach: new Coach({
                    id: 2,
                    firstName: 'James',
                    lastName: 'Bond',
                    email: 'jamesbond@ucll.be',
                    phoneNumber: '0487654321',
                }),
            }),
        ],
    }),
];

const getAllGames = (): Game[] => {
    return games;
};

const getGameById = (id: number): Game | undefined => {
    try {
        return games.find((game) => game.getId() === id) || undefined;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default { getAllGames, getGameById };
