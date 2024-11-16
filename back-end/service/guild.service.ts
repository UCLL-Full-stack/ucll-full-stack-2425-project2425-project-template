import { Guild } from "../model/guild";
import guildDb from "../repository/guild.db";
import { DiscordPermission, KanbanPermission, Member, PermissionEntry } from "../types";


interface CreateGuildInput {
    guildId: string;
    guildName: string;
    settings: PermissionEntry[];
    roleIds?: string[];
    userIds?: string[];
    members?: Member[];
    boardIds?: string[];
}

interface UpdateGuildInput {
    guildName?: string;
    members?: Member[];
    roleIds?: string[];
    settings?: PermissionEntry[];
    userIds?: string[];
    boardIds?: string[];
}

const getAllGuilds = async (): Promise<Guild[]> => {
    return await guildDb.getAllGuilds();
}

const getGuildById = async (guildId: string): Promise<Guild> => {
    return await guildDb.getGuildById(guildId);
}

const addGuild = async (guildData: CreateGuildInput): Promise<Guild> => {
    const { guildId, guildName, settings = [], roleIds = [], members = [], userIds = [], boardIds = [] } = guildData;
    const guild = await guildDb.getGuildById(guildId);
    if( guild ) {
        throw new Error("Guild already exists");
    }
    if( settings.length === 0 ) {
        settings.push({ identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR]})
    } else {
        const adminPermission = settings.find(permission => permission.identifier === DiscordPermission.ADMINISTRATOR);
        if( !adminPermission ) {
            settings.push({ identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR]});
        }
    }
    return await guildDb.addGuild(guildData);
}

const updateGuild = async (guildId: string, guildData: UpdateGuildInput): Promise<Guild> => {
    const guild = await guildDb.getGuildById(guildId);
    if( !guild ) {
        throw new Error("Guild not found");
    }
    return await guildDb.updateGuild(guildId, guildData);
}

export default {
    getAllGuilds,
    getGuildById,
    addGuild,
    updateGuild
}