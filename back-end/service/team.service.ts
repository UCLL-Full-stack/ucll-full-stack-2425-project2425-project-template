import { Team } from "../model/team";
import teamRepository from "../repository/team.db";

const getAllTeams = (): Team[] => {
    return teamRepository.getAllTeams();
};

const getTeamById = (id: number): Team | undefined => {
    if (id == null) {
        throw new Error('The id is required');
    }
    return teamRepository.getTeamById(id);
};

export default { getAllTeams, getTeamById };