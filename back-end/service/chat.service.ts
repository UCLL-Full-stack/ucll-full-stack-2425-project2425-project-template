import { Chat } from '../model/chat';
import chatDB from '../repository/chat.db';
import userDb from '../repository/user.db';
import { ChatInput } from '../types';

const getAllChat = async () => {
    return chatDB.getAllChat();
};

const getChatByUserId = ({ userId }: { userId: number }) => {
    return chatDB.getChatByUserId(userId);
};

const getChatById = async ({ id }: { id: number }) => {
    const chat =  chatDB.getChatById(id);

    if (!chat) {
        throw new Error(`chat with id ${id} does not exist.`);
    }
    return chat
};
const createChat = async (chat: ChatInput) => {
    console.log(chat.userId);
    console.log(await userDb.getUserById(chat.userId))
    if(await userDb.getUserById(chat.userId) === null || await userDb.getUserById(chat.userId ) === undefined){
        throw new Error(`User with id ${chat.userId} does not exist.`);
    }
    

    const newChat = new Chat({
        id: chat.id,
        message: chat.message,
        createdAt: chat.createdAt,
        userId: chat.userId,
    });
    
    return chatDB.createChat(newChat);
}

export default {
    getAllChat,
    getChatByUserId,
    getChatById,
    createChat
};
