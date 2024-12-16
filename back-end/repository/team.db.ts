import { Competition } from '../model/competition';
import { Team } from '../model/team';
import { User } from '../model/user';
import { CompetitionInput } from '../types';
import { competitions } from './competition.db';
import { users } from './user.db';

let nextId = 1;

const teams = [
    new Team({
        id: nextId++,
        name: 'sk diamant',
        points: 0,
        owner: users[0],
        competitionId: competitions[0].getId()!,
    }),
];

const createTeam = (team: Team): Team => {
    team['id'] = nextId++;
    teams.push(team);
    return team;
};
const getAllTeams = (): Team[] => {
    return teams;
};

const getTeamById = (id: number): Team | undefined => {
    try {
        return teams.find((team) => team.getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while getting a team by id');
    }
};

const getTeamsByCompetition = ({ competitionId }: { competitionId: number }): Team[] => {
    if (!competitionId) {
        throw new Error('The competition is required');
    }
    return teams.filter((team) => team.getCompetition() === competitionId);
};

export default { getAllTeams, getTeamById, getTeamsByCompetition, createTeam };
