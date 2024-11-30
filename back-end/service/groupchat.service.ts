import { GroupChat } from "../model/groupchat";
import { GroupChatInput } from "../types";
import groupChatDB from "../repository/groupchat.db";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import userService from "./user.service";

const getAllGroupChats = async () => groupChatDB.getAllGroupChats();

const getGroupChatById = async ({ id }: { id: number }) => {
    const groupChat = groupChatDB.getGroupChatById(id);

    if (!groupChat) {
        throw new Error(`groupChat with id ${id} does not exist.`);
    }
    return groupChat
};

const createGroupChat = async (groupChat: GroupChatInput) => {

    const users = await Promise.all(
        groupChat.users.map(async (userInput) => {
            const id: number = Number(userInput);
            console.log(id);
            if (id === undefined) {
                throw new Error(`User ID is undefined`);
            }
            const user = await userService.getUserById({ id });
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            return user;
        })
    );

    console.log(users);
    

    const newGroupChat = new GroupChat({
        id: groupChat.id,
        name: groupChat.name,
        description: groupChat.description,
        createdAt: groupChat.createdAt
    });

    return groupChatDB.createGroupChat(newGroupChat, users);
}


export default {
    getAllGroupChats,
    getGroupChatById,
    createGroupChat
};