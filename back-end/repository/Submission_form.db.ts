import { SubmissionForm } from '../model/Submission_form';
import { Gebruiker } from '../model/Gebruiker';
import { Race } from '../model/Race';
import { Driver } from '../model/Driver';
import { Crash } from '../model/Crash';
import { Admin } from '../model/Admin';
import { Racecar } from '../model/Racecar'

const submissionForms: SubmissionForm[] = [
    new SubmissionForm({
        title: 'Race Application 1',
        content: 'This is the first race application form.',
        user: new Gebruiker({ username: 'user1', password: 'password1', id: 1 }),
        race: new Race({
            name: 'Grand Prix Monaco',
            type: 'Formula 1',
            description: 'A prestigious race',
            location: 'Monaco',
            drivers: [
                new Driver({
                    name: 'Lewis Hamilton',
                    team: 'Mercedes',
                    description: 'A skilled driver',
                    age: 36,
                    racecar: new Racecar({
                        car_name: 'Mercedes W12',
                        type: 'Formula 1',
                        description: 'A high-performance racecar',
                        hp: 1000,
                    }),
                    crash: new Crash({
                        type: 'Collision',
                        description: 'A severe crash',
                        casualties: 5,
                        deaths: 2,
                    }),
                }),
            ],
            crashes: [
                new Crash({
                    type: 'Collision',
                    description: 'A severe crash',
                    casualties: 5,
                    deaths: 2,
                }),
            ],
            admin: new Admin({ username: 'adminuser1', password: 'adminpassword1' }),
            id: 1,
        }),
        id: 1,
    }),
    new SubmissionForm({
        title: 'Race Application 2',
        content: 'This is the second race application form.',
        user: new Gebruiker({ username: 'user2', password: 'password2', id: 2 }),
        race: new Race({
            name: 'Grand Prix Silverstone',
            type: 'Formula 1',
            description: 'A historic race',
            location: 'Silverstone',
            drivers: [
                new Driver({
                    name: 'Max Verstappen',
                    team: 'Red Bull',
                    description: 'A competitive driver',
                    age: 24,
                    racecar:  new Racecar({
                        car_name: 'Red Bull RB16B',
                        type: 'Formula 1',
                        description: 'A high-performance racecar',
                        hp: 1050,
                    }),
                    crash: new Crash({
                        type: 'Collision',
                        description: 'A minor crash',
                        casualties: 0,
                        deaths: 0,
                    }),
                }),
            ],
            crashes: [
                new Crash({
                    type: 'Collision',
                    description: 'A minor crash',
                    casualties: 0,
                    deaths: 0,
                }),
            ],
            admin: new Admin({ username: 'adminuser2', password: 'adminpassword2' }),
            id: 2,
        }),
        id: 2,
    }),
    // New Submission Form with a Race that Doesn't Exist Yet
    new SubmissionForm({
        title: 'Race Application 3',
        content: 'This is the third race application form.',
        user: new Gebruiker({ username: 'user3', password: 'password3', id: 3 }),
        race: new Race({
            name: 'Grand Prix Imola',
            type: 'Formula 1',
            description: 'A challenging race',
            location: 'Imola',
            drivers: [
                new Driver({
                    name: 'Charles Leclerc',
                    team: 'Ferrari',
                    description: 'A talented driver',
                    age: 23,
                    racecar:  new Racecar({
                        car_name: 'Ferrari SF21',
                        type: 'Formula 1',
                        description: 'A high-performance racecar',
                        hp: 1020,
                    }),
                    crash: new Crash({
                        type: 'Collision',
                        description: 'A major crash',
                        casualties: 3,
                        deaths: 1,
                    }),
                }),
            ],
            crashes: [
                new Crash({
                    type: 'Collision',
                    description: 'A major crash',
                    casualties: 3,
                    deaths: 1,
                }),
            ],
            admin: new Admin({ username: 'adminuser3', password: 'adminpassword3' }),
            id: 3,
        }),
        id: 3,
    }),
];

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