import { SubmissionForm } from '../model/submission';
import { Race } from '../model/race';
import { Driver } from '../model/driver';
import { Crash } from '../model/crash';
import { Racecar } from '../model/racecar'

const getAllSubmission_forms = (): SubmissionForm[] => {
    return submissionForms;
};

const createSubmission_form = (submission_form: SubmissionForm): void => {
    // Find the maximum existing ID and increment it by one
    const maxId = submissionForms.reduce((max, form) => (form.id && form.id > max ? form.id : max), 0);
    submission_form.id = maxId + 1;
    submissionForms.push(submission_form);
};

const getSubmission_formById = (id: number): SubmissionForm | undefined => {
    return submissionForms.find(submission_form => submission_form.id === id);
};

const deleteSubmission_form = (id: number): void => {
    const index = submissionForms.findIndex(submission_form => submission_form.id === id);
    if (index !== -1) {
        submissionForms.splice(index, 1);
    }
};

export default {
    getAllSubmission_forms,
    createSubmission_form,
    getSubmission_formById,
    deleteSubmission_form,
};