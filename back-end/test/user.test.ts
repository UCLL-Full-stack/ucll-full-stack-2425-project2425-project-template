import { User } from '../model/user';
import { Role } from '../types';

test('given: valid values for a user, when: user is constructed, then: user is created with those values', () => {
    // given valid values for a user
    const validEmail = 'john.doe@mail.com';
    const validPassword = 'JohnD123!';
    const validRole = 'user';

    // when user is constructed
    const user = new User({ email: validEmail, password: validPassword, role: validRole });

    // then user is created with those values
    expect(user.getEmail()).toEqual(validEmail);
    expect(user.getPassword()).toEqual(validPassword);
    expect(user.getRole()).toEqual(validRole);
});

test('given: invalid email for a user, when: a user is constructed, then: error is thrown', () => {
    // given invalid values for a user
    const invalidEmail = '';
    const validPassword = 'JohnD123!';
    const validRole = 'user';

    // when user is constructed
    const user = () => new User({ email: invalidEmail, password: validPassword, role: validRole });

    expect(user).toThrow('Email is required');
});

test('given: invalid password for a user, when: a user is constructed, then: error is thrown', () => {
    // given invalid values for a user
    const validEmail = 'john.doe@mail.com';
    const invalidPassword = '';
    const validRole = 'user';

    // when user is constructed
    const user = () => new User({ email: validEmail, password: invalidPassword, role: validRole });

    expect(user).toThrow('Password is required');
});

test('given: invalid role for a user, when: a user is constructed, then: error is thrown', () => {
    // given invalid values for a user
    const validEmail = 'john.doe@mail.com';
    const validPassword = 'JohnD123!';
    const invalidRole = '' as Role;

    // when user is constructed
    const user = () => new User({ email: validEmail, password: validPassword, role: invalidRole });

    expect(user).toThrow('Role is required');
});
