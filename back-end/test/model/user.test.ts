import { User } from '../../model/user';
import { Role } from '../../types';

const validUserData = {
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: 'student' as Role,
};

test('should create a user with the provided valid data', () => {
    // Given: Create a user with valid data
    const user = new User(validUserData);

    // Then: Validate that the user fields are correctly assigned
    expect(user.getUsername()).toEqual(validUserData.username);
    expect(user.getFirstName()).toEqual(validUserData.firstName);
    expect(user.getLastName()).toEqual(validUserData.lastName);
    expect(user.getEmail()).toEqual(validUserData.email);
    expect(user.getPassword()).toEqual(validUserData.password);
    expect(user.getRole()).toEqual(validUserData.role);
});

test('should throw an error when username is missing or empty', () => {
    // Given: Create a user with an empty username
    const user = { ...validUserData, username: '' };

    // Then: Expect an error for missing username
    expect(() => new User(user)).toThrow('Username is required');
});

test('should throw an error when first name is missing or empty', () => {
    // Given: Create a user with an empty first name
    const user = { ...validUserData, firstName: '' };

    // Then: Expect an error for missing first name
    expect(() => new User(user)).toThrow('First name is required');
});

test('should throw an error when last name is missing or empty', () => {
    // Given: Create a user with an empty last name
    const user = { ...validUserData, lastName: '' };

    // Then: Expect an error for missing last name
    expect(() => new User(user)).toThrow('Last name is required');
});

test('should throw an error when email is missing or empty', () => {
    // Given: Create a user with an empty email
    const user = { ...validUserData, email: '' };

    // Then: Expect an error for missing email
    expect(() => new User(user)).toThrow('Email is required');
});

test('should throw an error when password is missing or empty', () => {
    // Given: Create a user with an empty password
    const user = { ...validUserData, password: '' };

    // Then: Expect an error for missing password
    expect(() => new User(user)).toThrow('Password is required');
});

test('should be equal when two users have the same data', () => {
    // Given: Two users with the same data
    const user1 = new User(validUserData);
    const user2 = new User(validUserData);

    // Then: Users should be considered equal
    expect(user1.equals(user2)).toBe(true);
});

test('should not be equal when two users have different data', () => {
    // Given: Two users with different data (email changed)
    const user1 = new User(validUserData);
    const user2 = new User({ ...validUserData, email: 'different.email@example.com' });

    // Then: Users should not be considered equal
    expect(user1.equals(user2)).toBe(false);
});

test('should create a user from Prisma data', () => {
    // Given: Mock Prisma user data
    const prismaUser = {
        id: 1,
        username: 'jane_doe',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        role: 'admin',
    };

    // When: Creating a user from Prisma data
    const user = User.from(prismaUser);

    // Then: Validate that the user data is correctly mapped
    expect(user.getUsername()).toEqual(prismaUser.username);
    expect(user.getFirstName()).toEqual(prismaUser.firstName);
    expect(user.getLastName()).toEqual(prismaUser.lastName);
    expect(user.getEmail()).toEqual(prismaUser.email);
    expect(user.getPassword()).toEqual(prismaUser.password);
    expect(user.getRole()).toEqual(prismaUser.role as Role);
});