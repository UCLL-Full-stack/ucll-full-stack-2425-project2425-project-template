import submissionFormService from '../../service/submission_form.service';
import submissionFormDb from '../../repository/submission.db';
import { SubmissionForm } from '../../model/submission_form';
import { Gebruiker } from '../../model/user';
import { Race } from '../../model/race';
import { Driver } from '../../model/driver';
import { Racecar } from '../../model/racecar';
import { Crash } from '../../model/crash';
import { Admin } from '../../model/admin';

jest.mock('../../repository/Submission_form.db');

const userInput = {
    username: 'user1',
    password: 'password1',
    id: 1
};

const racecarInput = {
    car_name: 'Mercedes W12',
    type: 'Formula 1',
    description: 'A fast racecar',
    hp: 1000
};

const crashInput = {
    type: 'Collision',
    description: 'A severe crash',
    casualties: 5,
    deaths: 2
};

const driverInput = {
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    description: 'A skilled driver',
    age: 36,
    racecar: racecarInput,
    crash: crashInput,
    id: 1
};

const raceInput = {
    name: 'Grand Prix Monaco',
    type: 'Formula 1',
    description: 'A high-speed race',
    location: 'Monaco',
    drivers: [driverInput],
    crashes: [crashInput],
    admin: { id: 1, username: 'adminuser', password: 'adminpassword' }
};

const submissionFormInput = {
    title: 'Race Application 1',
    content: 'This is the first race application form.',
    user: new Gebruiker(userInput),
    race: new Race({
        ...raceInput,
        drivers: [new Driver({ ...driverInput, racecar: new Racecar(driverInput.racecar), crash: new Crash(driverInput.crash) })],
        crashes: [new Crash(crashInput)],
        admin: new Admin(raceInput.admin)
    })
};

const user = new Gebruiker(userInput);
const driver = new Driver({ ...driverInput, racecar: new Racecar(driverInput.racecar), crash: new Crash(driverInput.crash) });
const race = new Race({ ...raceInput, drivers: [driver], crashes: [driver.getCrash()], admin: new Admin(raceInput.admin) });

let createSubmissionFormMock: jest.Mock;
let mockSubmissionFormDbGetAllSubmissionForms: jest.Mock;

beforeEach(() => {
    createSubmissionFormMock = jest.fn();
    mockSubmissionFormDbGetAllSubmissionForms = jest.fn();

    submissionFormDb.createSubmission_form = createSubmissionFormMock;
    submissionFormDb.getAllSubmission_forms = mockSubmissionFormDbGetAllSubmissionForms;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should create a submission form successfully', () => {
    // Given
    createSubmissionFormMock.mockReturnValue(new SubmissionForm(submissionFormInput));

    // When
    const result = submissionFormService.createSubmissionForm(submissionFormInput);

    // Then
    expect(createSubmissionFormMock).toHaveBeenCalledTimes(1);
    expect(createSubmissionFormMock).toHaveBeenCalledWith(expect.objectContaining({
        title: submissionFormInput.title,
        content: submissionFormInput.content,
        user,
        race,
    }));
    expect(result).toEqual(expect.objectContaining({
        title: submissionFormInput.title,
        content: submissionFormInput.content,
        user,
        race,
    }));
});

test('should throw an error when title is missing', () => {
    // Given
    const invalidSubmissionFormInput = { ...submissionFormInput, title: '' };

    // When / Then
    expect(() => submissionFormService.createSubmissionForm(invalidSubmissionFormInput)).toThrowError('Title is required');
});