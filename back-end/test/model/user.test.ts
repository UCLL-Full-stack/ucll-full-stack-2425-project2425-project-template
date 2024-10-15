import { User } from '../../model/user';
import { Role } from '../../types';

let id: number | undefined;
let username: string;
let firstName: string;
let lastName: string;
let email: string;
let password: string;
let role: Role;

beforeEach(() => {
    id = undefined;
    username = '@BobHope';
    firstName = 'Bob';
    lastName = 'Hope';
    email = 'bobhope@gmail.com';
    password = 'bob123';
    role = 'user';
});

test(`given: valid values for user, when: user is created, then: user is created with those values`, () => {
    // when
    const user: User = new User({ id, username, firstName, lastName, email, password, role });

    // then
    expect(user.getUserId()).toBe(id);
    expect(user.getUsername()).toBe(username);
    expect(user.getFirstName()).toBe(firstName);
    expect(user.getLastName()).toBe(lastName);
    expect(user.getEmail()).toBe(email);
    expect(user.getPassword()).toBe(password);
    expect(user.getRole()).toBe(role);
});
