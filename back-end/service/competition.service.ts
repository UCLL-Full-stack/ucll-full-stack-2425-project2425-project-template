import { Competition } from '../model/competition';
import competitionDb from '../repository/competition.db';
import { CompetitionInput } from '../types';

const getAllCompetitions = async (): Promise<Competition[]> => {
    const competitions = await competitionDb.getAllCompetitions();
    return competitions;
};

const createCompetition = async ({
    name,
    matchesPlayed,
}: CompetitionInput): Promise<Competition> => {
    const competition = new Competition({ name, matchesPlayed });
    return await competitionDb.createCompetition(competition);
};

const getCompetitionById = async (id: number): Promise<Competition> => {
    const competition = await competitionDb.getCompetitionById({ id });
    if (!competition) throw new Error(`Competition with id ${id} does not exist.`);
    return competition;
};

export default { createCompetition, getCompetitionById, getAllCompetitions };
