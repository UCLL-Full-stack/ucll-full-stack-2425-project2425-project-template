import { Submission } from '../model/submission';
import database from '../util/database';

const createSubmission = async ({ submission }: { submission: Submission }): Promise<Submission> => {
    try {
        const submissionPrisma = await database.submission.create({
            data: {
                title: submission.getTitle(),
                content: submission.getContent(),
                type: submission.getType(),
                createdAt: submission.getCreatedAt(),
                solvedAt: submission.getSolvedAt(),
                user: {
                    connect: {
                        id: submission.getCreatedBy(),
                    },
                },
            },
        });

        return Submission.from(submissionPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getAllSubmissions = async ():Promise<Submission[] | null> => {
    try {
        const submissionPrisma = await database.submission.findMany({
            include: {
                user: true,
            },
        });
        return submissionPrisma.map((submissionPrisma) => Submission.from(submissionPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getSubmissionById = async ({ id }: { id: number }): Promise<Submission | null> => {
    try {
        const submissionPrisma = await database.submission.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });

        return submissionPrisma ? Submission.from(submissionPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteSubmissionById = async ({ submissionId }: { submissionId: number }): Promise<void> => {
    try {
        const submission = await database.submission.findUnique({
            where: {
                id: submissionId,
            },
        });

        if (!submission) {
            throw new Error('Submission not found');
        }

        const user = await database.user.update({
            where: { id: submission.userId },
            data: {
                submissions: {
                    disconnect: {
                        id: submissionId,
                    },
                },
            },
        });

        await database.submission.delete({
            where: {
                id: submissionId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getSubmissionsByCreatedBy = async (createdBy: number): Promise<Submission[] | null> => {
    try {
        const submissionPrisma = await database.submission.findMany({
            where: {
                userId: createdBy,
            },
            include: {
                user: true,
            },
        });
        return submissionPrisma.map((submissionPrisma) => Submission.from(submissionPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default {
    getAllSubmissions,
    createSubmission,
    getSubmissionById,
    deleteSubmissionById,
    getSubmissionsByCreatedBy
};