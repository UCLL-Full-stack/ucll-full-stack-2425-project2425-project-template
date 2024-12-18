import database from '../util/database';
import { Competition } from '../model/competition';

const createCompetition = async ({ name, matchesPlayed }: Competition): Promise<Competition> => {
    try {
        const competitionPrisma = await database.competition.create({
            data: {
                name,
                matchesPlayed,
            },
        });
        return Competition.from(competitionPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server logs');
    }
};

const getCompetitionById = async ({ id }: { id: number }): Promise<Competition | null> => {
    try {
        const competitionPrisma = await database.competition.findUnique({
            where: { id },
        });
        return competitionPrisma ? Competition.from(competitionPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server logs');
    }
};

export default {
    createCompetition,
    getCompetitionById,
};
