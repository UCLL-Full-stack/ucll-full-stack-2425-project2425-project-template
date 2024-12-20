import database from '../util/database';
import { Team } from '../model/team';

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            include: {
                competition: true,
                user: true,
            },
        });
        console.log(teamsPrisma);
        return teamsPrisma.map((teamsPrisma) => Team.from(teamsPrisma));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('no teams');
    }
};

const deleteTeam = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.team.delete({
            where: { id },
            include: {
                competition: true,
                user: true,
            },
        });
        console.log(`Team with id ${id} successfully deleted.`);
    } catch (error) {
        console.error(`Error deleting team with id ${id}:`, error);
        throw new Error('Database error, see server logs');
    }
};

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
                user: {
                    connect: { id: userId },
                },
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

const getTeamsByCompetition = async ({
    competitionId,
}: {
    competitionId: number;
}): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            where: {
                competitionId,
            },
            include: {
                competition: true,
                user: true,
            },
        });

        return teamsPrisma.map((teamPrisma) => Team.from(teamPrisma));
    } catch (error) {
        console.error(`Error fetching teams for competition ${competitionId}:`, error);
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
    deleteTeam,
    getTeamsByCompetition,
    getTeamById,
    getAllTeams,
};
