import { Subscription } from "../../model/subscription";
import { User } from "../../model/user";
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../../util/jwt";
import { Role } from "../../types";

const mockUser = new User({
  id: 1,
  username: "testuser",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  role: "user",
  password: "hashedPassword",
});

const mockSubscription = new Subscription({
  id: 1,
  type: "premium",
  startDate: new Date(),
  duration: "12",
});

let mockUserDBGetAllUsers: jest.Mock;
let mockUserDBGetUserByUsername: jest.Mock;
let mockUserDBCreateUser: jest.Mock;
let mockUserDBChangeSubscriptionOfUser: jest.Mock;
let mockBcryptHash: jest.Mock;
let mockBcryptCompare: jest.Mock;
let mockGenerateJwtToken: jest.Mock;

beforeEach(() => {
  mockUserDBGetAllUsers = jest.fn();
  mockUserDBGetUserByUsername = jest.fn();
  mockUserDBCreateUser = jest.fn();
  mockUserDBChangeSubscriptionOfUser = jest.fn();
  mockBcryptHash = jest.fn();
  mockBcryptCompare = jest.fn();
  mockGenerateJwtToken = jest.fn();

  userDb.getAllUsers = mockUserDBGetAllUsers;
  userDb.getUserByUsername = mockUserDBGetUserByUsername;
  userDb.createUser = mockUserDBCreateUser;
  userDb.changeSubscriptionOfUser = mockUserDBChangeSubscriptionOfUser;
  bcrypt.hash = mockBcryptHash;
  bcrypt.compare = mockBcryptCompare;

  // Mock the generateJwtToken utility
  jest.mock("../../util/jwt", () => ({
    generateJwtToken: jest.fn(),
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

test("given: users exist, when: getAllUsers is called, then: it returns a list of users", async () => {
  mockUserDBGetAllUsers.mockResolvedValue([mockUser]);

  const result = await userService.getAllUsers();

  expect(result).toEqual([mockUser]);
  expect(mockUserDBGetAllUsers).toHaveBeenCalledTimes(1);
});

test("given: valid username, when: getUserByUsername is called, then: it returns the user", async () => {
  mockUserDBGetUserByUsername.mockResolvedValue(mockUser);

  const result = await userService.getUserByUsername({ username: "testuser" });

  expect(result).toEqual(mockUser);
  expect(mockUserDBGetUserByUsername).toHaveBeenCalledWith({ username: "testuser" });
});

test("given: invalid username, when: getUserByUsername is called, then: it throws an error", async () => {
  mockUserDBGetUserByUsername.mockResolvedValue(null);

  await expect(
    userService.getUserByUsername({ username: "nonexistent" })
  ).rejects.toThrow("User with username: nonexistent does not exist.");

  expect(mockUserDBGetUserByUsername).toHaveBeenCalledWith({ username: "nonexistent" });
});

test("given: valid user input, when: createUser is called, then: it creates and returns the user", async () => {
  mockUserDBGetUserByUsername.mockResolvedValue(null);
  mockBcryptHash.mockResolvedValue("hashedPassword");
  mockUserDBCreateUser.mockResolvedValue(mockUser);

  const input = {
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    role: "user" as Role,
    password: "password123",
  };

  const result = await userService.createUser(input);

  expect(result).toEqual(mockUser);
  expect(mockUserDBGetUserByUsername).toHaveBeenCalledWith({ username: "testuser" });
  expect(mockBcryptHash).toHaveBeenCalledWith("password123", 12);
  expect(mockUserDBCreateUser).toHaveBeenCalledWith(expect.any(User));
});

test("given: existing username, when: createUser is called, then: it throws an error", async () => {
  mockUserDBGetUserByUsername.mockResolvedValue(mockUser);

  const input = {
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    role: "user" as Role,
    password: "password123",
  };

  await expect(userService.createUser(input)).rejects.toThrow(
    "User with username: testuser already exists"
  );

  expect(mockUserDBGetUserByUsername).toHaveBeenCalledWith({ username: "testuser" });
  expect(mockUserDBCreateUser).not.toHaveBeenCalled();
});

test("given: valid subscription input, when: changeSubscriptionOfUser is called, then: it updates the subscription", async () => {
  mockUserDBChangeSubscriptionOfUser.mockResolvedValue(mockUser);

  const result = await userService.changeSubscriptionOfUser(
    { id: 1, type: "premium", start_date: new Date("2024-01-01"), duration: "12" },
    1
  );

  expect(result).toEqual(mockUser);
  expect(mockUserDBChangeSubscriptionOfUser).toHaveBeenCalledWith(expect.any(Subscription), 1);
});

test("given: invalid subscription input, when: changeSubscriptionOfUser is called, then: it throws an error", async () => {
  await expect(
    userService.changeSubscriptionOfUser(
      { id: 1, type: undefined, start_date: undefined, duration: undefined },
      1
    )
  ).rejects.toThrow("Subscription type is required.");

  expect(mockUserDBChangeSubscriptionOfUser).not.toHaveBeenCalled();
});


test("given: invalid password, when: authenticate is called, then: it throws an error", async () => {
  mockUserDBGetUserByUsername.mockResolvedValue(mockUser);
  mockBcryptCompare.mockResolvedValue(false);

  await expect(
    userService.authenticate({ username: "testuser", password: "wrongpassword" })
  ).rejects.toThrow("Incorrect password.");

  expect(mockUserDBGetUserByUsername).toHaveBeenCalledWith({ username: "testuser" });
  expect(mockBcryptCompare).toHaveBeenCalledWith("wrongpassword", "hashedPassword");
});
