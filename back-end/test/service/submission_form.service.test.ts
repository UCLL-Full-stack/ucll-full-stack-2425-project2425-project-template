import submissionService from '../../service/Submission.service';
import submissionDb from '../../repository/Submission.db';
import { Submission } from '../../model/Submission';
import { User } from '../../model/User';
import Permissions from '../../model/Permissions';

jest.mock('../../repository/submission.db');

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
let mockSubmissionDbGetAllSubmission: jest.Mock;

beforeEach(() => {
    createSubmissionMock = jest.fn();
    mockSubmissionDbGetAllSubmission = jest.fn();

    submissionDb.createSubmission = createSubmissionMock;
    submissionDb.getAllSubmissions = mockSubmissionDbGetAllSubmission;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should create a submission form successfully', async () => {
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

test('given missing title when creating submission, throw new error', async () => {
    // Given
    const invalidSubmissionInput = { ...submissionInput, title: '' };

    // When / Then
    await expect(submissionService.createSubmission(invalidSubmissionInput)).rejects.toThrowError('Title is required');
});