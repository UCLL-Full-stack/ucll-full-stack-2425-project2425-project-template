import submissionService from '../../service/submission.service';
import submissionDb from '../../repository/submission.db';
import { Submission } from '../../model/submission';
import { Race } from '../../model/race';
import { Driver } from '../../model/driver';
import { Racecar } from '../../model/racecar';
import { Crash } from '../../model/crash';
import { User } from '../../model/user';

jest.mock('../../repository/submission.db');

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
    user: new User(userInput),
    race: new Race({
        ...raceInput,
        drivers: [new Driver({ ...driverInput, racecar: new Racecar(driverInput.racecar), crash: new Crash(driverInput.crash) })],
        crashes: [new Crash(crashInput)],
        admin: new Admin(raceInput.admin)
    })
};

const user = new User(userInput);
const driver = new Driver({ ...driverInput, racecar: new Racecar(driverInput.racecar), crash: new Crash(driverInput.crash) });
const race = new Race({ ...raceInput, drivers: [driver], crashes: [driver.getCrash()], admin: new Admin(raceInput.admin) });

let createSubmissionFormMock: jest.Mock;
let mockSubmissionFormDbGetAllSubmissionForms: jest.Mock;

beforeEach(() => {
    createSubmissionFormMock = jest.fn();
    mockSubmissionFormDbGetAllSubmissionForms = jest.fn();

    submissionDb.createSubmission = createSubmissionFormMock;
    submissionDb.getAllSubmissions = mockSubmissionFormDbGetAllSubmissionForms;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should create a submission form successfully', () => {
    // Given
    createSubmissionFormMock.mockReturnValue(new Submission(submissionInput));

    // When
    const result = submissionService.createSubmission(submissionFormInput);

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
    expect(() => submissionService.createSubmission(invalidSubmissionFormInput)).toThrowError('Title is required');
});