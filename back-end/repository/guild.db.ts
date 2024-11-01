// repository/guildRepository.ts
import { gu } from 'date-fns/locale';
import { Guild } from '../model/guild';
import { Role } from '../model/role';
import { PermissionEntry, KanbanPermission, DiscordPermission } from '../types';
import  roleDb  from './role.db';

const role1_1 = roleDb.getRoleById("role1-1")!;
const role1_2 = roleDb.getRoleById("role1-2")!;
const role2_1 = roleDb.getRoleById("role2-1")!;
const role2_2 = roleDb.getRoleById("role2-2")!;
const role3_1 = roleDb.getRoleById("role3-1")!;
const role3_2 = roleDb.getRoleById("role3-2")!;

const guild1Members = [
    { userId: "user1", roleIds: ["role1-1", "role1-2"] },
    { userId: "user3", roleIds: ["role1-2"] }
];

const guild2Members = [
    { userId: "user1", roleIds: ["role2-1"] },
    { userId: "user2", roleIds: ["role2-2"] }
];

const guild3Members = [
    { userId: "user3", roleIds: ["role3-2"] }
];

// static data
const guilds: Guild[] = [
    new Guild(
        "guild1",
        "Guild 1",
        [
            { identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR]},
            { identifier: DiscordPermission.BAN_MEMBERS, kanbanPermission: [KanbanPermission.VIEW_BOARD, KanbanPermission.ASSIGN_TASKS, KanbanPermission.CHANGE_TASK_STATUS, KanbanPermission.CREATE_TASKS, KanbanPermission.DELETE_TASKS, KanbanPermission.EDIT_TASKS, KanbanPermission.VIEW_ACTIVITY_LOG, KanbanPermission.EDIT_BOARD, KanbanPermission.CREATE_COLUMNS, KanbanPermission.EDIT_COLUMNS, KanbanPermission.DELETE_COLUMNS, KanbanPermission.MANAGE_TASK_ASSIGNEES] },
            { identifier: DiscordPermission.TIMEOUT_MEMBERS, kanbanPermission: [KanbanPermission.VIEW_BOARD, KanbanPermission.ASSIGN_TASKS, KanbanPermission.CHANGE_TASK_STATUS, KanbanPermission.CREATE_TASKS, KanbanPermission.DELETE_TASKS, KanbanPermission.EDIT_TASKS, KanbanPermission.VIEW_ACTIVITY_LOG] },
            { identifier: "role1-1", kanbanPermission: [KanbanPermission.VIEW_BOARD, KanbanPermission.CHANGE_TASK_STATUS]}
        ],
        [
            role1_1, role1_2
        ],
        guild1Members
    ),
    new Guild(
        "guild2",
        "Guild 2",
        [
            { identifier: DiscordPermission.MANAGE_CHANNELS, kanbanPermission: [KanbanPermission.CREATE_BOARD, KanbanPermission.EDIT_BOARD, KanbanPermission.DELETE_BOARD] },
            { identifier: DiscordPermission.MANAGE_MESSAGES, kanbanPermission: [KanbanPermission.CREATE_TASKS, KanbanPermission.EDIT_TASKS, KanbanPermission.DELETE_TASKS] },
            { identifier: "role2-1", kanbanPermission: [KanbanPermission.VIEW_BOARD, KanbanPermission.MANAGE_BOARD_PERMISSIONS] },
            { identifier: "role2-2", kanbanPermission: [KanbanPermission.CREATE_COLUMNS, KanbanPermission.EDIT_COLUMNS] },
        ],
        [
            role2_1, role2_2
        ],
        guild2Members
    ),
    new Guild(
        "guild3",
        "Guild 3",
        [
            { identifier: DiscordPermission.VIEW_CHANNELS, kanbanPermission: [KanbanPermission.VIEW_BOARD] },
            { identifier: DiscordPermission.CREATE_INVITE, kanbanPermission: [KanbanPermission.ASSIGN_TASKS, KanbanPermission.MANAGE_TASK_ASSIGNEES] },
            { identifier: DiscordPermission.MUTE_MEMBERS, kanbanPermission: [KanbanPermission.VIEW_ACTIVITY_LOG, KanbanPermission.CREATE_COLUMNS] },
            { identifier: "role3-1", kanbanPermission: [KanbanPermission.EDIT_COLUMNS, KanbanPermission.DELETE_COLUMNS] },
            { identifier: "role3-2", kanbanPermission: [KanbanPermission.VIEW_BOARD] },
        ],
        [
            role3_1, role3_2
        ],
        guild3Members
    ),
];

const getGuilds = (): Guild[] => {
    return guilds;
}

const getGuildById = (guildId: string): Guild | null => {
    return guilds.find(guild => guild.getGuildId() === guildId) || null;
}

const addSettingsEntryToGuildById = (guildId: string, settingsEntry: PermissionEntry): void => {
    const guild = getGuildById(guildId);
    if(guild){
        guild.addSettingsEntry(settingsEntry);
    }
}

const setSettingsEntriesToGuildById = (guildId: string, settingsEntries: PermissionEntry[]): void => {
    const guild = getGuildById(guildId);
    if(guild){
        guild.setSettingsEntries(settingsEntries);
    }
}

const removeSettingsEntryFromGuildById = (guildId: string, settingsEntryIdentifier: string): void => {
    const guild = getGuildById(guildId);
    if(guild){
        guild.removeSettingsEntry(settingsEntryIdentifier);
    }
}

const addRoleToGuildById = (guildId: string, role: Role): void => {
    const guild = getGuildById(guildId);
    if(guild){
        guild.addRole(role);
    }
}

const removeRoleFromGuildById = (guildId: string, roleId: string): void => {
    const guild = getGuildById(guildId);
    if(guild){
        guild.removeRole(roleId);
    }
}

export default {
    getGuilds,
    getGuildById,
    addSettingsEntryToGuildById,
    setSettingsEntriesToGuildById,
    removeSettingsEntryFromGuildById,
    addRoleToGuildById,
    removeRoleFromGuildById
};
