import { Chat } from '../../model/chat';
import { User } from '../../model/user';
import chatDb from '../../repository/chat.db';
import userDb from '../../repository/user.db';
import chatService from '../../service/chat.service';

const message = 'Test message'; // or use your `me` variable if it's defined elsewhere
const createdAt = new Date(); // or a specific date if needed
const userId = 1;


let createChatMock: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    createChatMock = jest.fn();
    mockUserDbGetUserById = jest.fn();
    // Mock the implementation of userDb.getUserById
    userDb.getUserById = mockUserDbGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid Chat, when Chat is created, then chat is created with those values', async () => {
    mockUserDbGetUserById.mockResolvedValue({ id: userId, name: 'Test User' });
    chatDb.createChat = createChatMock;

    // when
    await chatService.createChat({
        message,
        createdAt,
        userId,
    });

    // then
    expect(createChatMock).toHaveBeenCalledTimes(1);
    expect(createChatMock).toHaveBeenCalledWith(
        new Chat({ message, createdAt, userId })
    );
});


test('given a non-existent userId, when creating a chat, then an error is thrown', async () => {
    // Set up the mock to return null for the invalid user ID
    mockUserDbGetUserById.mockResolvedValue(null);

    // when & then
    await expect(chatService.createChat({
        message,
        createdAt,
        userId: userId, // This user ID is invalid
    })).rejects.toThrow(`User with id ${userId} does not exist.`);
});