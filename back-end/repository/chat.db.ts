import { Chat } from '../model/chat';
import { users } from '../repository/user.db';

const chats = [
    new Chat({
        id: 1,
        message: 'lorem ipsum',
        createdAt: new Date('2003-12-18'),
        user: users[0],
    }),
    new Chat({
        id: 2,
        message: 'lorem ipsum2',
        createdAt: new Date('2005-12-18'),
        user: users[1],
    }),
];

const getAllChat = async (): Promise<Chat[]> => {
    return chats;
};

const getChatByUserId = (userId: number): Chat[] => {
    return chats.filter((chat) => chat.getUser().getId() === userId);
};

const getChatById = (id: number): Chat | null => {
    try {
        return chats.find((chat) => chat.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {getAllChat, getChatByUserId, getChatById };
