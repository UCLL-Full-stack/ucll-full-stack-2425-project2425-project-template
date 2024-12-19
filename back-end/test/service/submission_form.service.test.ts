import submissionService from '../../service/Submission.service';
import submissionDb from '../../repository/Submission.db';
import { Submission } from '../../model/Submission';
import { User } from '../../model/User';
import Permissions from '../../model/Permissions';

jest.mock('../../repository/Submission.db');

const submissionInput = {
    title: 'Race Application 1',
    content: 'This is the first race application form.',
    type: "TEST",
    createdAt: new Date('2021-05-23'),
    createdBy: 1,
    id: 1
};

const userInput = {
    username: "user1",
    password: "password1",
    name: "John",
    surname: "Doe",
    email: "john.doe@gmail.com",
    permission: Permissions.USER,
    submissions: [],
    createdAt: new Date()
};

const user = new User(userInput);

let createSubmissionMock: jest.Mock;
let getAllSubmissionsMock: jest.Mock;
let getSubmissionByIdMock: jest.Mock;
let deleteSubmissionByIdMock: jest.Mock;

beforeEach(() => {
    createSubmissionMock = jest.fn();
    getAllSubmissionsMock = jest.fn();
    getSubmissionByIdMock = jest.fn();
    deleteSubmissionByIdMock = jest.fn();

    submissionDb.createSubmission = createSubmissionMock;
    submissionDb.getAllSubmissions = getAllSubmissionsMock;
    submissionDb.getSubmissionById = getSubmissionByIdMock;
    submissionDb.deleteSubmissionById = deleteSubmissionByIdMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid submission input, when createSubmission is called, then submission is created successfully', async () => {
    // Given
    createSubmissionMock.mockReturnValue(new Submission(submissionInput));

    // When
    const result = await submissionService.createSubmission(submissionInput);

    // Then
    expect(createSubmissionMock).toHaveBeenCalledTimes(1);
    expect(createSubmissionMock).toHaveBeenCalledWith(expect.objectContaining({
        submission: expect.objectContaining({
            title: submissionInput.title,
            content: submissionInput.content,
            type: submissionInput.type,
            createdAt: submissionInput.createdAt,
            createdBy: submissionInput.createdBy,
        })
    }));
    expect(result).toEqual(expect.objectContaining({
        title: submissionInput.title,
        content: submissionInput.content,
    }));
});

test('given missing title when creating submission, then throw error', async () => {
    // Given
    const invalidSubmissionInput = { ...submissionInput, title: '' };

    // When / Then
    await expect(submissionService.createSubmission(invalidSubmissionInput)).rejects.toThrowError('Title is required');
});

test('given missing content when creating submission, then throw error', async () => {
    // Given
    const invalidSubmissionInput = { ...submissionInput, content: '' };

    // When / Then
    await expect(submissionService.createSubmission(invalidSubmissionInput)).rejects.toThrowError('Content is required');
});

test('given missing type when creating submission, then throw error', async () => {
    // Given
    const invalidSubmissionInput = { ...submissionInput, type: '' };

    // When / Then
    await expect(submissionService.createSubmission(invalidSubmissionInput)).rejects.toThrowError('Type is required');
});

test('given missing createdBy when creating submission, then throw error', async () => {
    // Given
    const invalidSubmissionInput = { ...submissionInput, createdBy: undefined };

    // When / Then
    await expect(submissionService.createSubmission(invalidSubmissionInput)).rejects.toThrowError('ID of user is required');
});

test('given valid submissions, when getAllSubmissions is called, then return all submissions', async () => {
    // Given
    const submissions = [new Submission(submissionInput)];
    getAllSubmissionsMock.mockReturnValue(submissions);

    // When
    const result = await submissionService.getAllSubmissions();

    // Then
    expect(getAllSubmissionsMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(submissions);
});
test('given valid submission ID, when deleteSubmission is called, then delete the submission', async () => {
    // Given
    const submissionId = 1;

    // When
    await submissionService.deleteSubmission(submissionId);

    // Then
    expect(deleteSubmissionByIdMock).toHaveBeenCalledTimes(1);
    expect(deleteSubmissionByIdMock).toHaveBeenCalledWith({ submissionId });
});