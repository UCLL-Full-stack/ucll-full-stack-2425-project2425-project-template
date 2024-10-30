import { User } from "../../model/user";
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";

let mockUserDbGetAllUsers: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = userDb.getAllUsers = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given users exist, when getAllUsers is called, then it returns all users", async () => {
    // given
    const users = [
        new User({ name: "Jorrit", email: "jorrit@email.com", password: "UnhackableHackmaster123", role: 'admin' }),
        new User({ name: "John", email: "john@email.com", password: "VerySecure123", role: 'parent' }),
        new User({ name: "Johnjr", email: "johnjr@email.com", password: "VerySecure123", role: 'child' })
    ];
    mockUserDbGetAllUsers.mockReturnValue(users);

    // when
    const result = await userService.getAllUsers();

    // Log the values to the terminal
    console.log("Users:", users);
    console.log("Result:", result);

    // then
    expect(result).toEqual(users);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});

test("given no users exist, when getAllUsers is called, then it returns an empty list", async () => {
    // given
    const users: User[] = [];
    mockUserDbGetAllUsers.mockReturnValue(users);

    // when
    const result = await userService.getAllUsers();

    // Log the values to the terminal
    console.log("Users:", users);
    console.log("Result:", result);

    // then
    expect(result).toEqual(users);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});