import { Team } from '../model/team';
import teamDb from '../repository/team.db';
import { TeamInput } from '../types/index';

const getAllTeams = (): Team[] => {
    return teamDb.getAllTeams();
};

const createTeam = ({ teamName, players, coach }: TeamInput): Team => {
    const allTeams = teamDb.getAllTeams() || [];
    for (var team of allTeams) {
        if (teamName == team.getTeamName()) {
            throw new Error('Team with that name already exists.');
        }
    }
    if (players.length === 0) {
        throw new Error('Team must have at least one player.');
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
    return team;
};

const getTeamsByCoach = (coachId: number): Team[] => {
    if (!teamDb.getTeamsByCoach(coachId)) {
        throw new Error(`Coach with id ${coachId} does not exist.`);
    }
    return teamDb.getTeamsByCoach(coachId);
};

const updateTeam = ({id, teamName, coach, players}: TeamInput): Team => {

    if (id == undefined) {
        throw new Error('An id is required.');
    }
    
    if (teamDb.getTeamById(id) == undefined) {
        throw new Error('No team with that id exists.');
    }

    const updatedTeam = new Team({id, teamName, coach, players});

    return teamDb.updateTeam(updatedTeam);
};

export default { getAllTeams, getTeamsByCoach, getTeamById, createTeam };
