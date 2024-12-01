import SubmissionDb from '../repository/submission.db';
import { Submission } from '../model/submission';
import RaceService from './Race.service';
import { RaceInput, DriverInput, CrashInput } from '../types';

const getAllSubmissions = async (): Promise<Submission[] | null> => {
    return SubmissionDb.getAllSubmissions();
}

const createSubmission = async (submissionInput: any): Promise<Submission> => {
    if (!submissionInput.title) {
        throw new Error('Title is required');
    }
    if (!submissionInput.content) {
        throw new Error('Content is required');
    }
    if (!submissionInput.user) {
        throw new Error('User is required');
    }
    if (!submissionInput.race) {
        throw new Error('Race is required');
    }

    const newSubmission = new Submission({
        title: submissionInput.title,
        content: submissionInput.content,
        type: submissionInput.type,
        createdAt: submissionInput,
        solvedAt: submissionInput.solvedAt,
        createdBy: submissionInput.user,
    });

    SubmissionDb.createSubmission({ submission: newSubmission });
    return newSubmission;
};

const acceptSubmission = async (submissionId: number): Promise<Submission> => {
    const submission = await SubmissionDb.getSubmissionById({ id: submissionId });

    if (!submission) {
        throw new Error(`Submission form not found with ID ${submissionId}`);
    }



    return submission;
};

const deleteSubmission = async (submissionId: number): Promise<void> => {
    SubmissionDb.deleteSubmissionById({ submissionId });
};

export default {
    getAllSubmissions,
    createSubmission,
    acceptSubmission,
    deleteSubmission,
};