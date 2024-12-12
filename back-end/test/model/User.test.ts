import { User } from '../../model/User';
import { Permission } from '../../types';

test('given: valid values for User, when: User is created, then: User is created with those values', () => {
    // given
    const username = 'testuser';
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@mail.com';
    const password = 'password123';
    const permission: Permission = "USER";
    const createdAt = new Date();
    const id = 1;

    // when
    const user = new User({username, name, surname, email, password, permission, createdAt, id});

    // then
    expect(user.getUsername()).toBe(username);
    expect(user.getPassword()).toBe(password);
    expect(user.getId()).toBe(id);
});

test('given: missing username, when: User is created, then: an error is thrown', () => {
    // given
    const userData = {
        username: '',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@mail.com',
        password: 'password123',
        permission: "USER" as Permission,
        createdAt: new Date(),
    };

    // when / then
    expect(() => new User(userData)).toThrowError('Username is required');
});

test('given: missing password, when: User is created, then: an error is thrown', () => {
    // given
    const userData = {
        username: 'testuser',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@mail.com',
        password: '',
        permission: "USER" as Permission,
        createdAt: new Date(),
    };

    // when / then
    expect(() => new User(userData)).toThrowError('Password is required');
});

test('given: missing name, when: User is created, then: an error is thrown', () => {
    // given
    const userData = {
        username: 'testuser',
        name: '',
        surname: 'Doe',
        email: 'john.doe@mail.com',
        password: 'password123',
        permission: "USER" as Permission,
        createdAt: new Date(),
    };

    // when / then
    expect(() => new User(userData)).toThrowError('Name is required');
});

test('given: missing surname, when: User is created, then: an error is thrown', () => {
    // given
    const userData = {
        username: 'testuser',
        name: 'John',
        surname: '',
        email: 'john.doe@mail.com',
        password: 'password123',
        permission: "USER" as Permission,
        createdAt: new Date(),
    };

    // when / then
    expect(() => new User(userData)).toThrowError('Surname is required');
});

test('given: missing email, when: User is created, then: an error is thrown', () => {
    // given
    const userData = {
        username: 'testuser',
        name: 'John',
        surname: 'Doe',
        email: '',
        password: 'password123',
        permission: "USER" as Permission,
        createdAt: new Date(),
    };

    // when / then
    expect(() => new User(userData)).toThrowError('Email is required');
});

test('given: missing permission, when: User is created, then: an error is thrown', () => {
    // given
    const userData = {
        username: 'testuser',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@mail.com',
        password: 'password123',
        permission: '' as Permission,
        createdAt: new Date(),
    };

    // when / then
    expect(() => new User(userData)).toThrowError('Permission is required');
});