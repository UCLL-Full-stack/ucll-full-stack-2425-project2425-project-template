import Competition from "../model/competition";
import competitionDb from "../repository/competition.db";
import { CompetitionDTO } from "../types";
import Team from "../model/team";

const getAllCompetitions = (): Competition[] => {
    return competitionDb.getAllCompetitions();
}

const createCompetition = (competitionDTO: CompetitionDTO): Competition => {
    const teams = Array.isArray(competitionDTO.teams) ? competitionDTO.teams.map(teamDTO => new Team(teamDTO)) : [];
    const competition = new Competition({ ...competitionDTO, teams });
    competitionDb.createCompetition(competition);
    return competition;
}

const editCompetition = (competitionDTO: CompetitionDTO): Competition => {
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
