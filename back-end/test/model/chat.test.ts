import { Chat } from '../../model/chat';
import { User } from '../../model/user';
const message = 'lorem ipsum lorem ipsum';
const createdAt = new Date();
const userId = 1

test('given: chat with all fields, when: creating chat, then: chat is created', () => {
    //when
    const chat = new Chat({
        message,
        createdAt,
        userId,
    });
    //then

    expect(chat.getMessage()).toBe(message);
    expect(chat.getCreatedAt()).toBe(createdAt);
    expect(chat.getUserId()).toBe(userId);
});

test('given: chay with missing date, when: creating chat, then: error is thrown', () => {
    //when
    const chat = () => new Chat({ message, createdAt: undefined as any, userId });

    // then
    expect(chat).toThrow('Chat creation date is required');
});

// test('given: chay with missing userid, when: creating chat, then: error is thrown', () => {
//     //when
//     const chat = () => new Chat({ message, createdAt, userId: undefined as any});

//     // then
//     expect(chat).toThrow('Chat user is required');
// });
