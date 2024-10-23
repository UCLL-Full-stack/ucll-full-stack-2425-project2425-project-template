import { Team } from '../model/team';
import teamDb from '../repository/team.db';
import { TeamInput } from '../types/index'

const getAllTeams = (): Team[] => {
    return teamDb.getAllTeams();
};

const getTeamsByCoach = (coachId: number): Team[] => {
    return teamDb.getTeamsByCoach(coachId);
};

const createTeam = ({teamName, players, coach}: TeamInput): Team => {
    for (var team of getAllTeams()) {
        if (teamName == team.getTeamName()) {
            throw new Error('Team with that name already exists.');
        }
    }
    const createdTeam = new Team({ teamName, players, coach });
    teamDb.createTeam(createdTeam);
    return createdTeam;
};

const getTeamById = (id: number): Team => {
    const toReturn = teamDb.getTeamById(id);
    if (toReturn == undefined) {
        throw new Error('Team with id ${id} does not exist.');
    }
    return toReturn;
};

export default { getAllTeams, getTeamsByCoach, getTeamById, createTeam };