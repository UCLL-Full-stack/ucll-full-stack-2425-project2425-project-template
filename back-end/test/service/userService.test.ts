import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { User } from '../../model/user';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../util/jwt';

jest.mock('../../repository/user.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

let mockUser: User;

beforeEach(() => {
  mockUser = new User({ id: 1, name: 'Alice', email: 'alice@example.com', password: 'hashedpassword', role: 'user' });
  jest.clearAllMocks();
});

test('givenUsersInDatabase_whenGetAllUsersIsCalled_thenItReturnsAllUsers', async () => {
  // given
  const users = [
    new User({ id: 1, name: 'Alice', email: 'alice@example.com', password: 'hashedpassword', role: 'user' }),
    new User({ id: 2, name: 'Bob', email: 'bob@example.com', password: 'hashedpassword', role: 'admin' }),
  ];
  (userDb.getAllUsers as jest.Mock).mockResolvedValue(users);

  // when
  const result = await userService.getAllUsers();

  // then
  expect(userDb.getAllUsers).toHaveBeenCalled();
  expect(result).toEqual(users);
});

test('givenAValidUserId_whenGetUserByIdIsCalled_thenItReturnsTheUser', async () => {
  // given
  const id = 1;
  (userDb.getUserById as jest.Mock).mockResolvedValue(mockUser);

  // when
  const result = await userService.getUserById(id);

  // then
  expect(userDb.getUserById).toHaveBeenCalledWith({ id });
  expect(result).toBe(mockUser);
});

test('givenAnInvalidUserId_whenGetUserByIdIsCalled_thenThrowsError', async () => {
  // given
  const id = 999;
  (userDb.getUserById as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(userService.getUserById(id)).rejects.toThrow(`User with id ${id} not found`);
});

test('givenAValidUserName_whenGetUserByNameIsCalled_thenItReturnsTheUser', async () => {
  // given
  const name = 'Alice';
  (userDb.getUserByName as jest.Mock).mockResolvedValue(mockUser);

  // when
  const result = await userService.getUserByName({ name });

  // then
  expect(userDb.getUserByName).toHaveBeenCalledWith({ name });
  expect(result).toBe(mockUser);
});

test('givenAnInvalidUserName_whenGetUserByNameIsCalled_thenThrowsError', async () => {
  // given
  const name = 'Unknown';
  (userDb.getUserByName as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(userService.getUserByName({ name })).rejects.toThrow(`User with name: ${name} does not exist.`);
});

test('givenAValidUserEmail_whenGetUserByEmailIsCalled_thenItReturnsTheUser', async () => {
  // given
  const email = 'alice@example.com';
  (userDb.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

  // when
  const result = await userService.getUserByEmail({ email });

  // then
  expect(userDb.getUserByEmail).toHaveBeenCalledWith({ email });
  expect(result).toBe(mockUser);
});

test('givenAnInvalidUserEmail_whenGetUserByEmailIsCalled_thenThrowsError', async () => {
  // given
  const email = 'unknown@example.com';
  (userDb.getUserByEmail as jest.Mock).mockResolvedValue(null);

  // when / then
  await expect(userService.getUserByEmail({ email })).rejects.toThrow(`User with name: ${email} does not exist.`);
});

test('givenValidCredentials_whenAuthenticateIsCalled_thenReturnsAuthenticationResponse', async () => {
  // given
  const email = 'alice@example.com';
  const password = 'password';
  (userDb.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
  (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  (generateJwtToken as jest.Mock).mockReturnValue('token');

  // when
  const result = await userService.authenticate({ email, password });

  // then
  expect(userDb.getUserByEmail).toHaveBeenCalledWith({ email });
  expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.getPassword());
  expect(generateJwtToken).toHaveBeenCalledWith({ email, role: mockUser.getRole() });
  expect(result).toEqual({ token: 'token', email, role: mockUser.getRole() });
});

test('givenInvalidPassword_whenAuthenticateIsCalled_thenThrowsError', async () => {
  // given
  const email = 'alice@example.com';
  const password = 'wrongpassword';
  (userDb.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
  (bcrypt.compare as jest.Mock).mockResolvedValue(false);

  // when / then
  await expect(userService.authenticate({ email, password })).rejects.toThrow('Incorrect password.');
});