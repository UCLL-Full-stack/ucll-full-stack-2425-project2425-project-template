import { get } from "http";
import { Team } from "../model/team";
import User from "../model/User";
import teamDb from "../repository/team.db";
import { TeamInput } from "../types";

const createTeam = ({ teamId, members, coach }: TeamInput): Team => {
    if (!teamId) throw new Error('Team id is required');
    if (!members) throw new Error('Team members are required');
    if (!coach) throw new Error('Team coach is required');

    const existingTeam = teamDb.getTeamById(teamId);

    if (existingTeam) throw new Error('This team already exists.');

    const newTeam = new Team({ teamId, members, coach });
    return teamDb.addTeam(newTeam);
};

const getAllTeams = (): Team[] => teamDb.getAllTeams();

const getTeamById = (teamId: number): Team | undefined => teamDb.getTeamById(teamId);

export default { createTeam, getAllTeams, getTeamById };