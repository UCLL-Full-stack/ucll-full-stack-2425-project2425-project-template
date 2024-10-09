import { User } from '../../model/user';

const username1 = 'testUser';
const password1 = '123ad!@457ufn';
const user: User = new User({ username: username1, password: password1 });

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    expect(user.getUsername()).toBe(username1);
    expect(user.getPassword()).toBe(password1);
});
