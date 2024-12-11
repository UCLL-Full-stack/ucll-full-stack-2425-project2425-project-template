import SubmissionDb from '../repository/Submission.db';
import { Submission } from '../model/Submission';

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
    if (!submissionInput.createdBy) {
        throw new Error('ID of user is required');
    }
    if (!submissionInput.type) {
        throw new Error('Type is required');
    }

    const newSubmission = new Submission({
        title: submissionInput.title,
        content: submissionInput.content,
        type: submissionInput.type,
        createdAt: new Date(submissionInput.createdAt),
        solvedAt: submissionInput.solvedAt ? new Date(submissionInput.solvedAt) : undefined,
        createdBy: submissionInput.createdBy,
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