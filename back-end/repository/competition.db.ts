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

const createCompetition = async (competition: Competition): Promise<Competition> => {
    try {
        const competitionPrisma = await database.competition.create({
            data: {
                name: competition.getName(),
            },
            include: {
                teams: true,
            },
        });

        return new Competition({ ...competitionPrisma, teams: competitionPrisma.teams.map(team => new Team(team)) });
    } catch (error) {
        console.error(error);
        return competition;
    }
}

const editCompetition = async (competitionId: number, competition: Competition): Promise<Competition> => {
    try {
        const competitionPrisma = await database.competition.update({
            where: {
                id: competitionId,
            },
            data: {
                name: competition.getName(),
            },
            include: {
                teams: true,
            },
        });

        return new Competition({ ...competitionPrisma, teams: competitionPrisma.teams.map(team => new Team(team)) });
    } catch (error) {
        console.error(error);
        return competition;
    }
}

export default {
    getAllCompetitions,
    createCompetition,
    editCompetition,
}