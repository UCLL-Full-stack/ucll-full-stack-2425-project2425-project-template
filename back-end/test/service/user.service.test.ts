import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { User } from '../../model/user';
import { UserInput } from '../../types';

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockUserDbGetUserByName: jest.Mock;

beforeEach(() => {
  // Mock the database functions
  mockUserDbGetAllUsers = jest.fn();
  mockUserDbGetUserById = jest.fn();
  mockUserDbCreateUser = jest.fn();
  mockUserDbGetUserByName = jest.fn();

  // Replace the actual functions in userDb with the mocks
  userDb.getAllUsers = mockUserDbGetAllUsers;
  userDb.getUserById = mockUserDbGetUserById;
  userDb.createUser = mockUserDbCreateUser;
  userDb.getUserByName = mockUserDbGetUserByName;
});

afterEach(() => {
  jest.clearAllMocks();
});


  
test('given a request for all users, when getAllUsers is called, then it returns all users', async () => {
  
  const users = [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }];
  mockUserDbGetAllUsers.mockResolvedValue(users);

  
  const result = await userService.getAllUsers();

  
  expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
  expect(result).toEqual(users);
});

test('given a valid user ID, when getUserById is called, then it returns the user with that ID', async () => {
  
  const user = { id: 1, name: 'User1' };
  mockUserDbGetUserById.mockResolvedValue(user);

  
  const result = await userService.getUserById({ id: 1 });

  
  expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
  expect(result).toEqual(user);
});

test('given no user ID, when getUserById is called, then it throws an error', async () => {
  await expect(userService.getUserById({ id: NaN })).rejects.toThrow('User ID is required');
});

test('given a valid user, when user is created, then user is created with those values', async () => {
  const userInput = { id: 1, password: 'securePass123', firstname: 'Jane', name: 'Doe' };
  const expectedUser = new User({
    id: userInput.id,
    password: userInput.password,
    firstName: userInput.firstname,
    name: userInput.name,
  });

  mockUserDbCreateUser.mockResolvedValue(expectedUser);

  
  const createdUser = await userService.createUser(userInput);

  
  expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
  expect(mockUserDbCreateUser).toHaveBeenCalledWith(expectedUser);
  expect(createdUser).toEqual(expectedUser);
});

test('given a valid user name, when getUserByName is called, then it returns the user with that name', async () => {
  
  const user = { id: 1, name: 'Arend' };
  mockUserDbGetUserByName.mockResolvedValue(user);

  
  const result = await userService.getUserByName('Arend');

  
  expect(mockUserDbGetUserByName).toHaveBeenCalledWith('Arend');
  expect(result).toEqual(user);
});

test('given valid credentials, when loginUser is called, then it logs in the user', async () => {
  
  const userInput = { name: 'Valvekens', password: 'pass123' };
  const existingUser = new User({ id: 1, password: 'pass123', firstName: 'Arend', name: 'Valvekens' });
  mockUserDbGetUserByName.mockResolvedValue(existingUser);

  
  const result = await userService.loginUser(userInput as UserInput);

  
  expect(mockUserDbGetUserByName).toHaveBeenCalledWith('Valvekens');
  expect(result).toEqual(existingUser);
});

test('given invalid credentials, when loginUser is called, then it throws an error', async () => {
  
  const userInput = {
    name: 'Valvekens', password: 'wrongPass'};
  const existingUser = new User({ id: 1, password: 'pass123', firstName: 'Arend', name: 'Valvekens' });
  mockUserDbGetUserByName.mockResolvedValue(existingUser);

  await expect(userService.loginUser(userInput as UserInput)).rejects.toThrow('Invalid credentials');
});


