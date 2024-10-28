import { Team } from '../model/team';
import teamDb from '../repository/team.db';
import { TeamInput } from '../types/index';

const getAllTeams = (): Team[] => {
    return teamDb.getAllTeams();
};

const createTeam = ({ teamName, players, coach }: TeamInput): Team => {
    const allTeams = teamDb.getAllTeams() || [];
    const coachId = coach.getId();
    for (var team of allTeams) {
        if (teamName == team.getTeamName()) {
            throw new Error('Team with that name already exists.');
        }
    }
    if (players.length === 0) {
        throw new Error('Team must have at least one player.');
    }
    if (!coach || coachId === undefined || coachId <= 0) {
        throw new Error('Coach with that id does not exist.');
    }

    const createdTeam = new Team({ teamName, players, coach });
    teamDb.createTeam(createdTeam);
    return createdTeam;
};

const getTeamById = (id: number): Team | undefined => {
    const team = teamDb.getTeamById(id);

    if (!team) {
        throw new Error(`Team with id ${id} does not exist.`);
    }
    teamDb.getTeamById(id);
    return team;
};

const getTeamsByCoach = (coachId: number): Team[] => {
    if (!teamDb.getTeamsByCoach(coachId)) {
        throw new Error(`Coach with id ${coachId} does not exist.`);
    }
    return teamDb.getTeamsByCoach(coachId);
};

export default { getAllTeams, getTeamsByCoach, getTeamById, createTeam };
