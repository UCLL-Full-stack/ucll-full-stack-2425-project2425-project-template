import submissionFormDb from '../repository/Submission_form.db';
import { SubmissionForm } from '../model/Submission_form';
import RaceService from './Race.service';
import { RaceInput } from '../types';

const getAllSubmissionForms = (): SubmissionForm[] => {
    return submissionFormDb.getAllSubmission_forms();
}

const createSubmissionForm = (submissionFormInput: any): SubmissionForm => {
    if (!submissionFormInput.title) {
        throw new Error('Title is required');
    }
    if (!submissionFormInput.content) {
        throw new Error('Content is required');
    }
    if (!submissionFormInput.user) {
        throw new Error('User is required');
    }
    if (!submissionFormInput.race) {
        throw new Error('Race is required');
    }

    const newSubmissionForm = new SubmissionForm({
        title: submissionFormInput.title,
        content: submissionFormInput.content,
        user: submissionFormInput.user,
        race: submissionFormInput.race,
    });

    submissionFormDb.createSubmission_form(newSubmissionForm);
    return newSubmissionForm;
};

const acceptSubmissionForm = (submissionFormId: number): SubmissionForm => {
    // todo
}

export default {
    getAllSubmissionForms,
    createSubmissionForm,
    acceptSubmissionForm,
};