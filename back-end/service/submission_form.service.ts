import submissionFormDb from '../repository/submission.db';
import { SubmissionForm } from '../model/submission_form';
import RaceService from './race.service';
import { RaceInput, DriverInput, CrashInput, AdminInput } from '../types';

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
    const submissionForm = submissionFormDb.getSubmission_formById(submissionFormId);
    // console.log(submissionForm)
    if (!submissionForm) {
        throw new Error(`Submission form not found with ID ${submissionFormId}`);
    }

    const race = submissionForm.getRace();
    const existingRace = RaceService.getRaceById(race.getId()!);

    if (existingRace) {
        const crash = submissionForm.getRace().getCrashes()![0];
        existingRace.getCrashes()!.push(crash);
    } else {
        const drivers: DriverInput[] = race.getDrivers()?.map(driver => ({
            name: driver.getName(),
            team: driver.getTeam(),
            description: driver.getDescription(),
            age: driver.getAge(),
            racecar: {
                car_name: driver.getRacecar().car_name,
                type: driver.getRacecar().type,
                description: driver.getRacecar().description,
                hp: driver.getRacecar().hp,
            },
            crash: {
                type: driver.getCrash().type,
                description: driver.getCrash().description,
                casualties: driver.getCrash().casualties,
                deaths: driver.getCrash().deaths,
            },
            id: driver.getId(),
        })) || [];

        const crashes: CrashInput[] = race.getCrashes()?.map(crash => ({
            type: crash.type,
            description: crash.description,
            casualties: crash.casualties,
            deaths: crash.deaths,
            id: crash.id,
        })) || [];

        const admin: AdminInput = {
            username: race.getAdmin()?.password || 'The admin is not known',
            password: race.getAdmin()?.password || 'The admin is not known',
            id: race.getAdmin()?.id,
        };

        const raceInput: RaceInput = {
            name: race.getName(),
            type: race.getType(),
            description: race.getDescription(),
            location: race.getLocation(),
            drivers,
            crashes,
            admin,
            id: race.getId(),
        };

        RaceService.createRace(raceInput);
    }

    submissionFormDb.deleteSubmission_form(submissionFormId);

    return submissionForm;
};

const deleteSubmissionForm = (submissionFormId: number): void => {
    submissionFormDb.deleteSubmission_form(submissionFormId);
};

export default {
    getAllSubmissionForms,
    createSubmissionForm,
    acceptSubmissionForm,
    deleteSubmissionForm,
};