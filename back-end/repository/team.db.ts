import database from '../util/database';
import { Team } from '../model/team';

const createTeam = async ({
    name,
    userId,
    competitionId,
}: {
    name: string;
    userId: number;
    competitionId: number;
}): Promise<Team> => {
    try {
        const teamPrisma = await database.team.create({
            data: {
                name,
                points: 0,
                userId,

                competition: {
                    connect: { id: competitionId },
                },
            },
            include: {
                competition: true,
                user: true,
            },
        });

        return Team.from(teamPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTeamById = async ({ id }: { id: number | undefined }): Promise<Team | null> => {
    try {
        const teamPrisma = await database.team.findUnique({
            where: { id },
            include: {
                competition: true,
            },
        });

        return teamPrisma ? Team.from(teamPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('error');
    }
};

export default {
    createTeam,
    getTeamById,
};
