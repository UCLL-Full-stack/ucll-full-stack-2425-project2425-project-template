import Competition from "../model/competition";
import competitionDb from "../repository/competition.db";
import { CompetitionInput } from "../types";
import Team from "../model/team";

const getAllCompetitions = async (): Promise<Competition[]> => {
    return await competitionDb.getAllCompetitions();
}

const createCompetition = async ({
    name,
    teams
}: CompetitionInput): Promise<Competition> => {
    if (!name) {
        throw new Error("Competition name is required.");
    }

    const competition = new Competition({
        name,
        teams: teams.map(teamDTO => new Team(teamDTO))
    });
    return await competitionDb.createCompetition(competition);
}

const editCompetition = async (competitionDTO: CompetitionInput): Promise<Competition> => {
    if (!competitionDTO.id) {
        throw new Error("Competition ID is required.");
    }

    const teams = Array.isArray(competitionDTO.teams) ? competitionDTO.teams.map(teamDTO => new Team(teamDTO)) : [];
    const competitionId = competitionDTO.id;
    const competition = new Competition({ ...competitionDTO, teams });
    competitionDb.editCompetition(competitionId, competition);
    return await competition;
}

export default {
    getAllCompetitions,
    createCompetition,
    editCompetition,
}