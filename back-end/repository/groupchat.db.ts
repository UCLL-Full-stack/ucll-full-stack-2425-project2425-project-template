import { tr } from "date-fns/locale"
import database from "./database";
import { GroupChat } from "../model/groupchat";


const getAllGroupChats = async () => {
    try {
        const groupChatPrisma = await database.groupChat.findMany({
            include: { users: true },
        });
        return groupChatPrisma.map((groupChatPrisma) => GroupChat.from(groupChatPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }

}

const getGroupChatById = async (id: number) => {
    try {
        const groupChatPrisma = await database.groupChat.findUnique({
            where: { id },
            include: { users: true },
        });
        return groupChatPrisma ? GroupChat.from(groupChatPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createGroupChat = async (groupChat: GroupChat): Promise<GroupChat> => {
    try {
        const groupChatPrisma = await database.groupChat.create({
            data: {
                name: groupChat.getName(),
                description: groupChat.getDescription(),
                createdAt: groupChat.getCreatedAt(),
            },
            include: { users: true },
        });
        return GroupChat.from(groupChatPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllGroupChats,
    getGroupChatById,
    createGroupChat
};