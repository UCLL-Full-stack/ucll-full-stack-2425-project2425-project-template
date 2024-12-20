import { User } from '../../model/user';
import { Role } from '../../types';

const validUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 't',
    role: 'user' as Role,
};

test('given: valid values for User properties; when: User is created; then: properties are set correctly', () => {
    const user = new User(validUser);

    expect(user.id).toEqual(validUser.id);
    expect(user.firstName).toEqual(validUser.firstName);
    expect(user.lastName).toEqual(validUser.lastName);
    expect(user.email).toEqual(validUser.email);
    expect(user.password).toEqual(validUser.password);
    expect(user.role).toEqual(validUser.role);
});

test('given: User equals method called with matching properties; when: all properties match; then: return true', () => {
    const user = new User(validUser);

    const isEqual = user.equals({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 't',
        role: 'user',
    });

    expect(isEqual).toBe(true);
});

test("given: User equals method called with non-matching properties; when: one or more properties don't match; then: return false", () => {
    const user = new User(validUser);

    const isEqual = user.equals({
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'y',
        role: 'admin',
    });

    expect(isEqual).toBe(false);
});

test('given: User equals method called; when: only one field is different; then: return false', () => {
    const user = new User(validUser);

    expect(user.equals({ ...validUser, firstName: 'Jane' })).toBe(false);
    expect(user.equals({ ...validUser, lastName: 'Smith' })).toBe(false);
    expect(user.equals({ ...validUser, email: 'jane.doe@example.com' })).toBe(false);
    expect(user.equals({ ...validUser, password: 'y' })).toBe(false);
    expect(user.equals({ ...validUser, role: 'admin' })).toBe(false);
});

test('given: an empty first name; when: User is created; then: an error is thrown', () => {
    const invalidUser = { ...validUser, firstName: '' };

    const user = () => new User(invalidUser);

    expect(user).toThrow('First name cannot be empty.');
});

test('given: an empty last name; when: User is created; then: an error is thrown', () => {
    const invalidUser = { ...validUser, lastName: '' };

    const user = () => new User(invalidUser);

    expect(user).toThrow('Last name cannot be empty.');
});

test('given: an empty email; when: User is created; then: an error is thrown', () => {
    const invalidUser = { ...validUser, email: '' };

    const user = () => new User(invalidUser);

    expect(user).toThrow('Email cannot be empty.');
});

test('given: an empty password; when: User is created; then: an error is thrown', () => {
    const invalidUser = { ...validUser, password: '' };

    const user = () => new User(invalidUser);

    expect(user).toThrow('Password cannot be empty.');
});

test('given: an invalid email; when: User is created; then: an error is thrown', () => {
    const invalidUser = { ...validUser, email: 'invalid-email' };

    const user = () => new User(invalidUser);

    expect(user).toThrow('Invalid Email: Must be a valid email address');
});
