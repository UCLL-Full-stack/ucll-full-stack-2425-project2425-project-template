import { Chat } from '../model/chat';
import chatDB from '../repository/chat.db';

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

export default {
    getAllChat,
    getChatByUserId,
    getChatById,
};
