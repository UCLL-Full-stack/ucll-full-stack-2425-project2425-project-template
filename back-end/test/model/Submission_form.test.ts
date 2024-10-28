import { SubmissionForm } from '../../model/Submission_form';

test('given: valid values for SubmissionForm, when: SubmissionForm is created, then: SubmissionForm is created with those values', () => {
    // given
    const type = 'Application';
    const sender = 'John Doe';
    const acceptance = true;

    // when
    const submissionForm = new SubmissionForm(type, sender, acceptance);

    // then
    expect(submissionForm.getType()).toBe(type);
    expect(submissionForm.getSender()).toBe(sender);
    expect(submissionForm.getAcceptance()).toBe(acceptance);
});