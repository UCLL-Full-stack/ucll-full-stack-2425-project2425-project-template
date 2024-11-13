import { Chat } from '../model/chat';
import { users } from '../repository/user.db';
import database from './database';

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

const getAllChats = async (): Promise<Chat[]> => {
    try {
        const chatPrisma = await database.chat.findMany();
        return chatPrisma.map((chatPrisma) => Chat.from(chatPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getChatByUserId = async (userId: number): Promise<Chat[]> => {
    try {
        const chatPrisma = await database.chat.findMany({
            where: { userId: userId }
        });
        return chatPrisma.map((chatPrisma) => Chat.from(chatPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getChatById = async (id: number): Promise<Chat | null> => {
    try {
        const chatPrisma = await database.chat.findUnique({
            where: {id: id}
        })  
        return chatPrisma ? Chat.from(chatPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const createChat = async (chat: Chat): Promise<Chat> => {
    try {
        const chatPrisma = await database.chat.create({
            data: {
                message: chat.getMessage(),
                createdAt: chat.getCreatedAt(),
                userId: chat.getUserId()
            }
        })
        return Chat.from(chatPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllChats, getChatByUserId, getChatById, createChat };
