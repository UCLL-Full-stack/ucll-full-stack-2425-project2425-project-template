import { Team } from "../model/team";
import teamDb from "../repository/team.db"
import { TeamInput } from "../types/types";


const getAllTeams = async (): Promise<Team[]> => {
    return teamDb.findAll();
}


const addTeam = async ({name}: TeamInput): Promise<Team> => {
    return teamDb.addTeam({name});
}

const updateTeam = async (id: number, {name}: TeamInput) => {
    return teamDb.updateTeam(id, {name});
}

const deleteTeam = async (id: number) => {
    return teamDb.deleteTeam(id);
}


export default { getAllTeams, addTeam, updateTeam, deleteTeam }; 