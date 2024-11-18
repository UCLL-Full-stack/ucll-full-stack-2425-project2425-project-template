import { Team } from '../model/team';
import database from './database';

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
