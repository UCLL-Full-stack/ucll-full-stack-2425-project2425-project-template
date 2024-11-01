import { set } from 'date-fns';
import { Role } from '../../types';
import { User } from '../../model/user';

const username: string = 'speedy-gonzales';
const email: string = 'speedy.gonzales@email.com';
const password: string = 'password123';
const role: Role = 'User';
const signUpDate: Date = set(new Date(), { date: 29, month: 8, year: 1953 });

const user = new User({
    username: 'speedy-gonzales',
    email: 'speedy.gonzales@email.com',
    password: 'password123',
    role: 'User',
    signUpDate: set(new Date(), { date: 29, month: 8, year: 1953 }),
});

test(`given: valid values for user, when: user is created, then: user is created with those values`, () => {
    // given

    // when
    const user = new User({
        username,
        email,
        password,
        role,
        signUpDate,
    });
    // then
    expect(user.getUsername()).toEqual(username);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getRole()).toEqual(role);
    expect(user.getSignUpDate()).toEqual(signUpDate);
});
