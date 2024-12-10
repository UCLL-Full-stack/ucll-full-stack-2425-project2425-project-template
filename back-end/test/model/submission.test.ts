import { Submission } from '../../model/Submission';
import { User } from '../../model/User';
import { Race } from '../../model/race';
import { Driver } from '../../model/Driver';
import { Racecar } from '../../model/Racecar';
import { Crash } from '../../model/crash';

test('given: valid values for SubmissionForm, when: SubmissionForm is created, then: SubmissionForm is created with those values', () => {
    // given
    const title = 'Race Application';
    const content = 'This is a race application form.';
    const user = new Gebruiker({ username: 'gebruiker', password: 'password123', id: 1 });
    const name = 'Grand Prix';
    const type = 'Formula 1';
    const description = 'A high-speed race';
    const location = 'Monaco';
    const driver = new Driver({
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
    });
    const drivers = [driver];
    const crashes = [driver.getCrash()];
    const admin = new Admin({ username: 'adminuser', password: 'adminpassword' });
    const id = 1;
    const race = new Race({ name, type, description, location, drivers, crashes, admin, id });

    // when
    const submissionForm = new SubmissionForm({ title, content, user, race, id });

    // then
    expect(submissionForm.getTitle()).toBe(title);
    expect(submissionForm.getContent()).toBe(content);
    expect(submissionForm.getUser()).toBe(user);
    expect(submissionForm.getRace()).toBe(race);
    expect(submissionForm.getId()).toBe(id);
});