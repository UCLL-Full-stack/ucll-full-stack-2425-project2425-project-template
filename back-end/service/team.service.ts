import { Competition } from '../model/competition';
import { Team } from '../model/team';
import competitionDb from '../repository/competition.db';
import teamDb from '../repository/team.db';
import teamRepository from '../repository/team.db';
import userDb from '../repository/user.db';
import { TeamInput } from '../types';

const getAllTeams = (): Team[] => {
    return teamRepository.getAllTeams();
};

const getTeamById = (id: number): Team | undefined => {
    if (id == null) {
        throw new Error('The id is required');
    }
    return teamRepository.getTeamById(id);
};

const createTeam = ({ name, points, owner: userInput, competitionId }: TeamInput): Team => {
    if (!name) {
        throw new Error('Team Name is required.');
    }

    if (!userInput.id) throw new Error('User id is required');
    if (!competitionId) throw new Error('Competition id is required.');

    const competition = competitionDb.getCompetitionById({ id: competitionId });
    const user = userDb.getUserById({ id: userInput.id });

    if (!competition) throw new Error('Competition not found');
    if (!user) throw new Error('User not found');

    const existingTeam = teamDb
        .getTeamsByCompetition({
            competitionId: competitionId,
        })
        .find((team) => team.getName() === name);

    if (existingTeam) throw new Error('This team already exists.');

    const team = new Team({ name, points, owner: user, competitionId });
    return teamDb.createTeam(team);
};

export default { getAllTeams, getTeamById, createTeam };
