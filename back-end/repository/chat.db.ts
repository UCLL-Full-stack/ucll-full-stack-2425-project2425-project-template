import { Chat } from '../model/chat';
import { users } from '../repository/user.db';

const chats = [
    new Chat({
        id: 1,
        message: 'lorem ipsum',
        createdAt: new Date('2003-12-18'),
        userId: users[0].getId(),
    }),
    new Chat({
        id: 2,
        message: 'lorem ipsum2',
        createdAt: new Date('2005-12-18'),
        userId: users[1].getId(),
    }),
];
users[0].addChat(chats[0]);
users[1].addChat(chats[1]);


const getAllChat = async (): Promise<Chat[]> => {
    return chats;
};

const getChatByUserId = (userId: number): Chat[] => {
    return chats.filter((chat) => chat.getUserId() === userId);
};

const getChatById = (id: number): Chat | null => {
    try {
        return chats.find((chat) => chat.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const createChat = async (chat: Chat): Promise<Chat> => {
    try {
            chats.push(chat);
            return chat;
    } catch (error) {
            console.error(error);
            throw new Error('Database error. See server log for details.');
        }
    
}

export default {getAllChat, getChatByUserId, getChatById, createChat};
