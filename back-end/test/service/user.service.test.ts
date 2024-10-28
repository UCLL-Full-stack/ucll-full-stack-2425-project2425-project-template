import { User } from '../../model/user';

let mockUserDbGetAllUsers: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
});

test('given: a filled userDb, when: getting all users from userService, then: all users are returned', () => {
    // given a filled userDB
    const users: User[] = [
        new User({ email: 'john.doe@mail.com', password: 'password', role: 'user' }),
    ];

    userDb.getAll = mockUserDbGetAllUsers.mockReturnValue(users);

    // when getting all users from userService
    userService.getAllUsers();

    // then all users are returned
    expect(mockUserDbGetAllUsers).toHaveBeenCalled();
    expect(mockUserDbGetAllUsers).toHaveReturnedWith(users);
});
