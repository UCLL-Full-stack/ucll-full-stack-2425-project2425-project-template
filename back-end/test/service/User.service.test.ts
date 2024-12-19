import userService from '../../service/User.service';
import userDb from '../../repository/User.db';
import { User } from '../../model/User';
import { Permission } from '../../types';
import bcrypt from 'bcrypt';

jest.mock('../../repository/User.db');
jest.mock('bcrypt');

const userInput = {
    username: 'testuser',
    password: 'Password123',
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@mail.com',
    permission: 'USER' as Permission,
    createdAt: new Date(),
};

let getUserByUsernameMock: jest.Mock;
let createUserMock: jest.Mock;
let bcryptHashMock: jest.Mock;
let bcryptCompareMock: jest.Mock;

beforeEach(() => {
    getUserByUsernameMock = jest.fn();
    createUserMock = jest.fn();
    bcryptHashMock = jest.fn();
    bcryptCompareMock = jest.fn();

    userDb.getUserByUsername = getUserByUsernameMock;
    userDb.createUser = createUserMock;
    bcrypt.hash = bcryptHashMock;
    bcrypt.compare = bcryptCompareMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid user input, when createUser is called, then user is created successfully', async () => {
    // Given
    const hashedPassword = 'hashedPassword123';
    bcryptHashMock.mockReturnValue(hashedPassword);
    createUserMock.mockReturnValue(new User({ ...userInput, password: hashedPassword }));

    // When
    const result = await userService.createUser(userInput);

    // Then
    expect(bcryptHashMock).toHaveBeenCalledTimes(1);
    expect(bcryptHashMock).toHaveBeenCalledWith(userInput.password, 10);
    expect(createUserMock).toHaveBeenCalledTimes(1);
    expect(createUserMock).toHaveBeenCalledWith(expect.objectContaining({
        user: expect.objectContaining({
            username: userInput.username,
            password: hashedPassword,
            name: userInput.name,
            surname: userInput.surname,
            email: userInput.email,
            permission: userInput.permission,
            createdAt: expect.any(Date),
            _id: undefined,
            submissions: [],
        })
    }));
    expect(result).toEqual(expect.objectContaining({
        username: userInput.username,
        name: userInput.name,
        surname: userInput.surname,
        email: userInput.email,
        permission: userInput.permission,
    }));
});

test('given missing username, when createUser is called, then throw error', async () => {
    // Given
    const invalidUserInput = { ...userInput, username: '' };

    // When / Then
    await expect(userService.createUser(invalidUserInput)).rejects.toThrowError('Username is required');
});

test('given missing password, when createUser is called, then throw error', async () => {
    // Given
    const invalidUserInput = { ...userInput, password: '' };

    // When / Then
    await expect(userService.createUser(invalidUserInput)).rejects.toThrowError('Password is required');
});

test('given missing name, when createUser is called, then throw error', async () => {
    // Given
    const invalidUserInput = { ...userInput, name: '' };

    // When / Then
    await expect(userService.createUser(invalidUserInput)).rejects.toThrowError('Name is required');
});

test('given missing surname, when createUser is called, then throw error', async () => {
    // Given
    const invalidUserInput = { ...userInput, surname: '' };

    // When / Then
    await expect(userService.createUser(invalidUserInput)).rejects.toThrowError('Surname is required');
});

test('given missing email, when createUser is called, then throw error', async () => {
    // Given
    const invalidUserInput = { ...userInput, email: '' };

    // When / Then
    await expect(userService.createUser(invalidUserInput)).rejects.toThrowError('Email is required');
});

test('given missing permission, when createUser is called, then throw error', async () => {
    // Given
    const invalidUserInput = { ...userInput, permission: '' as Permission };

    // When / Then
    await expect(userService.createUser(invalidUserInput)).rejects.toThrowError('Permission is required');
});

test('given valid username, when getUserByUsername is called, then return the user', async () => {
    // Given
    const username = 'testuser';
    const user = new User(userInput);
    getUserByUsernameMock.mockReturnValue(user);

    // When
    const result = await userService.getUserByUsername({ username });

    // Then
    expect(getUserByUsernameMock).toHaveBeenCalledTimes(1);
    expect(getUserByUsernameMock).toHaveBeenCalledWith({ username });
    expect(result).toEqual(user);
});

test('given invalid username, when getUserByUsername is called, then throw error', async () => {
    // Given
    const username = 'invaliduser';
    getUserByUsernameMock.mockReturnValue(null);

    // When / Then
    await expect(userService.getUserByUsername({ username })).rejects.toThrowError(`No user with username: ${username} does not exist`);
});

test('given valid values, when authenticate is called, then return authentication response', async () => {
    // Given
    const username = 'testuser';
    const password = 'password123';
    const fullName = 'John Doe';
    const permission = 'USER' as Permission;
    const user = new User(userInput);
    getUserByUsernameMock.mockReturnValue(user);
    bcryptCompareMock.mockReturnValue(true);

    // When
    const result = await userService.authenticate({ 
        username, 
        password,
        name: userInput.name, 
        surname: userInput.surname, 
        email: userInput.email, 
        permission
    });

    // Then
    expect(getUserByUsernameMock).toHaveBeenCalledTimes(1);
    expect(getUserByUsernameMock).toHaveBeenCalledWith({ username });
    expect(bcryptCompareMock).toHaveBeenCalledTimes(1);
    expect(bcryptCompareMock).toHaveBeenCalledWith(password, user.getPassword());
    expect(result).toEqual(expect.objectContaining({
        token: expect.any(String),
        username: username,
        fullName: fullName,
        permission: permission,
    }));
});

test('given invalid password, when authenticate is called, then throw error', async () => {
    // Given
    const username = 'testuser';
    const password = 'invalidpassword';
    const user = new User(userInput);
    getUserByUsernameMock.mockReturnValue(user);
    bcryptCompareMock.mockReturnValue(false);

    // When / Then
    await expect(userService.authenticate({ 
        username, 
        password, 
        name: userInput.name, 
        surname: userInput.surname, 
        email: userInput.email, 
        permission: userInput.permission 
    })).rejects.toThrowError('Incorrect username or password');
});