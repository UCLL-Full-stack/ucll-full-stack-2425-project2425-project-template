
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import { UserInput } from '../../types';

const users: UserInput[] = [
    {
        user_id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 't',
    },
    {
        user_id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'y',
    }
]


let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: no users; when: fetching all the users; then: an error is thrown`, () => {
    //given
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue(null);

    //when
    const getUsers = () => userService.getAllUsers();

    //then
    expect(getUsers).toThrow('No users found');
    expect(userDb.getAllUsers).toHaveBeenCalled();
});

test(`given: users; when: fetching all the users; then: the users are returned`, () => {
    //given
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue(users);

    //when
    const result = userService.getAllUsers();

    //then
    expect(result).toEqual(users);
    expect(userDb.getAllUsers).toHaveBeenCalled();
});

test(`given: invalid ID; when: fetching a user by ID; then: an error is thrown`, () => {
    //given
    const id = 1;
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(null);

    //when
    const getUserById = () => userService.getUserById(id);

    //then
    expect(getUserById).toThrow(`User with ID ${id} not found`);
    expect(userDb.getUserById).toHaveBeenCalledWith(id);
});

test(`given: valid ID; when: fetching a user by ID; then: the user is returned`, () => {
    //given
    const id = 1;
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(users[0]);

    //when
    const result = userService.getUserById(id);

    //then
    expect(result).toEqual(users[0]);
    expect(userDb.getUserById).toHaveBeenCalledWith(id);
});
