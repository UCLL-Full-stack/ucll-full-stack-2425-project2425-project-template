import Competition from "../model/competition";
import Team from "../model/team";
import database from "./database";

const competitions: Competition[] = [];

const getAllCompetitions = async (): Promise<Competition[]> => {
    try {
        const competitionsPrisma = await database.competition.findMany({
            include: {
                teams: true,
            },
        });

        return competitionsPrisma.map(competitionPrisma => 
            new Competition({ ...competitionPrisma, teams: competitionPrisma.teams.map(team => new Team(team)) })
        );
    } catch (error) {
        console.error(error);
        return [];
    }
}

const createCompetition = (competition: Competition): Competition => {
    competitions.push(competition);
    return competition;
}

const editCompetition = (competitionId: number, competition: Competition): Competition => {
    const index = competitions.findIndex(c => c.getId() === competitionId);
    if (index >= 0) {
        competitions[index] = competition;
    }
    return competition;
}

export default {
    getAllCompetitions,
    createCompetition,
    editCompetition,
}