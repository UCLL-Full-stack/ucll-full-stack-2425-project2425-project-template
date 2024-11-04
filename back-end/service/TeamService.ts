import { Team } from "../model/Team";
import { TeamInput } from "../types";

const createTeam = async ({
    teamId,
    members,
    coach
}: TeamInput): Promise<Team> => {
    const team = new Team ({
        teamId,
        members,
        coach,
    })
    return team;
}

export default {
    createTeam,
}