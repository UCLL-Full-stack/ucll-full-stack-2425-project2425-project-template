import { Profile } from '../../model/profile';
import { User } from '../../model/user';

const firstName1 = 'Test';
const lastName1 = 'User';
const email1 = 'test.user@ucll.be';
const user1 = new User({ username: 'test user', password: 'str!ngP@ss123' });
const profile: Profile = new Profile({
    firstName: firstName1,
    lastName: lastName1,
    email: email1,
    user: user1,
});

test('given: valid values for profile, when: profile is created, then: profile is created with those values', () => {
    expect(profile.getFirstName()).toBe(firstName1);
    expect(profile.getLastName()).toBe(lastName1);
    expect(profile.getEmail()).toBe(email1);
    expect(profile.getUser()).toBe(user1);
});
