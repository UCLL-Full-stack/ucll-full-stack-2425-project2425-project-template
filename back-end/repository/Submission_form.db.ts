import { SubmissionForm } from '../model/Submission_form';
import { Gebruiker } from '../model/Gebruiker';
import { Race } from '../model/Race';
import { Admin } from '../model/Admin';
import { Driver } from '../model/Driver';
import { Racecar } from '../model/Racecar';
import { Crash } from '../model/Crash';
import { get } from 'http';

const submissionForms = [
    new SubmissionForm({
        title: 'Race Application 1',
        content: 'This is the first race application form.',
        user: new Gebruiker({ username: 'user1', password: 'password1', id: 1 }),
        race: new Race({
            name: 'Grand Prix Monaco',
            type: 'Formula 1',
            description: 'A high-speed race',
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
                        description: 'A fast racecar',
                        hp: 1000
                    }),
                    crash: new Crash({
                        type: 'Collision',
                        description: 'A severe crash',
                        casualties: 5,
                        deaths: 2
                    })
                })
            ],
            crashes: [
                new Crash({
                    type: 'Collision',
                    description: 'A severe crash',
                    casualties: 5,
                    deaths: 2
                })
            ],
            admin: new Admin({ username: 'adminuser1', password: 'adminpassword1' }),
            id: 1
        }),
        id: 1
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
                    racecar: new Racecar({
                        car_name: 'Red Bull RB16B',
                        type: 'Formula 1',
                        description: 'A powerful racecar',
                        hp: 1050
                    }),
                    crash: new Crash({
                        type: 'Collision',
                        description: 'A minor crash',
                        casualties: 0,
                        deaths: 0
                    })
                })
            ],
            crashes: [
                new Crash({
                    type: 'Collision',
                    description: 'A minor crash',
                    casualties: 0,
                    deaths: 0
                })
            ],
            admin: new Admin({ username: 'adminuser2', password: 'adminpassword2' }),
            id: 2
        }),
        id: 2
    }),
];

const getAllSubmission_forms = (): SubmissionForm[] => {
    return submissionForms;
}

const createSubmission_form = (submission_form: SubmissionForm): void => {
    submissionForms.push(submission_form);
}; 

const getSubmission_formById = (id: number): SubmissionForm | undefined => {
    return submissionForms.find(submission_form => submission_form.id === id);
}

export default { getAllSubmission_forms, createSubmission_form, getSubmission_formById };