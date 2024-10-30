import { Coach } from '../model/coach';
import { Player } from '../model/player';
import { Team } from '../model/team';

const teams: Team[] = [
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
];

const getAllTeams = (): Team[] => {
    return teams;
};

const getTeamsByCoach = (coachId: number): Team[] => {
    const teamsToReturn = [];

    for (var team of teams) {
        if (team.getCoach().getId() == coachId) {
            teamsToReturn.push(team);
        }
    }
    return teamsToReturn;
};

const getTeamById = (id: number): Team | undefined => {
    return teams.find((team) => team.getId() === id) || undefined;
};

const createTeam = (newTeam: Team): Team => {
    teams.push(newTeam);
    return newTeam;
};

const updateTeam = (updatedTeam: Team): Team => {
    const oldTeamIndex = teams.findIndex((team) => team.getId() === updatedTeam.getId());
    teams[oldTeamIndex] = updatedTeam;
    return updatedTeam;
};

export default { getAllTeams, getTeamsByCoach, getTeamById, createTeam, updateTeam };
