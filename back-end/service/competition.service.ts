import Competition from "../model/competition";
import competitionDb from "../repository/competition.db";
import { CompetitionInput } from "../types";
import Team from "../model/team";

const getAllCompetitions = (): Competition[] => {
    return competitionDb.getAllCompetitions();
}

const createCompetition = ({
    name,
    teams
}: CompetitionInput): Competition => {
    if (!name) {
        throw new Error("Competition name is required.");
    }

    const competition = new Competition({
        name,
        teams: teams.map(teamDTO => new Team(teamDTO))
    });
    return competitionDb.createCompetition(competition);
}

const editCompetition = (competitionDTO: CompetitionInput): Competition => {
    if (!competitionDTO.id) {
        throw new Error("Competition ID is required.");
    }

    const teams = Array.isArray(competitionDTO.teams) ? competitionDTO.teams.map(teamDTO => new Team(teamDTO)) : [];
    const competitionId = competitionDTO.id;
    const competition = new Competition({ ...competitionDTO, teams });
    competitionDb.editCompetition(competitionId, competition);
    return competition;
}

export default {
    getAllCompetitions,
    createCompetition,
    editCompetition,
}