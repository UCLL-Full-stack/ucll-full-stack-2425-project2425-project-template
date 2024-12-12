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

test(`given: two equal users, when: the user.equals method is called, then: the method will return true`, () => {
    //given
    const user1 = new User({ id, username, firstName, lastName, email, password, role });

    //when
    const isEqual = user1.equal(user1);

    //then
    expect(isEqual).toBe(true);
});

test(`given: two different users, when: the user.equals method is called, then: the method will return false`, () => {
    //given
    const user1 = new User({ id, username, firstName, lastName, email, password, role });
    const user2 = new User({
        id,
        username: '@DifferentUser',
        firstName,
        lastName,
        email,
        password,
        role,
    });
    //when
    const isEqual = user1.equal(user2);

    //then
    expect(isEqual).toBe(false);
});
