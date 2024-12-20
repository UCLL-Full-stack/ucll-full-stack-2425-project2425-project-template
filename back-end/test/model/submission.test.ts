import { Submission } from '../../model/Submission';
import { User } from '../../model/User';
import Permissions from '../../model/Permissions';

test('given: valid values for SubmissionForm, when: SubmissionForm is created, then: SubmissionForm is created with those values', () => {
    // given
    const title = 'Race Application';
    const content = 'This is a race application form.';
    const type = "TEST";
    const createdAt = new Date('2021-05-23');
    const user = new User({ 
        username: 'JohnDoe', 
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@mail.com',
        password: 'password123', 
        permission: Permissions.USER,
        submissions: [],
        createdAt: new Date('2021-05-23'),
        id: 1 
    });
    const createdBy = 1;
    const id = user.getId();
    
    // when
    const submissionForm = new Submission({ title, content, type, createdAt, createdBy, id });

    // then
    expect(submissionForm.getTitle()).toBe(title);
    expect(submissionForm.getContent()).toBe(content);
    expect(submissionForm.getType()).toBe(type);
    expect(submissionForm.getCreatedAt()).toBe(createdAt);
    expect(submissionForm.getCreatedBy()).toBe(createdBy);
    expect(submissionForm.getId()).toBe(id);
});

test('given: missing title, when: SubmissionForm is created, then: an error is thrown', () => {
    // given
    const submissionData = {
        title: '',
        content: 'This is a race application form.',
        type: "TEST",
        createdAt: new Date('2021-05-23'),
        createdBy: 1,
    };

    // when / then
    expect(() => new Submission(submissionData)).toThrowError('Title is required');
});

test('given: missing content, when: SubmissionForm is created, then: an error is thrown', () => {
    // given
    const submissionData = {
        title: 'Race Application',
        content: '',
        type: "TEST",
        createdAt: new Date('2021-05-23'),
        createdBy: 1,
    };

    // when / then
    expect(() => new Submission(submissionData)).toThrowError('Content is required');
});

test('given: missing type, when: SubmissionForm is created, then: an error is thrown', () => {
    // given
    const submissionData = {
        title: 'Race Application',
        content: 'This is a race application form.',
        type: '',
        createdAt: new Date('2021-05-23'),
        createdBy: 1,
    };

    // when / then
    expect(() => new Submission(submissionData)).toThrowError('Type is required');
});