import { GroupChat } from "../model/groupchat";
import { GroupChatInput } from "../types";
import groupChatDB from "../repository/groupchat.db";

const getAllGroupChats = async () => groupChatDB.getAllGroupChats();

const getGroupChatById = async ({ id }: { id: number }) => {
    const groupChat = groupChatDB.getGroupChatById(id);

    if (!groupChat) {
        throw new Error(`groupChat with id ${id} does not exist.`);
    }
    return groupChat
};

const createGroupChat = async (groupChat: GroupChatInput) => {
    const newGroupChat = new GroupChat({
        id: groupChat.id,
        name: groupChat.name,
        description: groupChat.description,
        createdAt: groupChat.createdAt,
    });

    return groupChatDB.createGroupChat(newGroupChat);
}


export default {
    getAllGroupChats,
    getGroupChatById,
    createGroupChat
};