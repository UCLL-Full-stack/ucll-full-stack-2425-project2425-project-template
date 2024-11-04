import { Guild } from '../model/guild';
import { Role } from '../model/role';
import { PermissionEntry, KanbanPermission, DiscordPermission } from '../types';
import  roleDb  from './role.db';

const role1_1 = roleDb.getRoleById("role1-1")!;
const role2_1 = roleDb.getRoleById("role2-1")!;
const role1_2 = roleDb.getRoleById("role1-2")!;
const role2_2 = roleDb.getRoleById("role2-2")!;
const role1_3 = roleDb.getRoleById("role1-3")!;
const role2_3 = roleDb.getRoleById("role2-3")!;

const guild1Members = [
    { userId: "user1", roleIds: ["role1-1", "role2-1"] },
    { userId: "user3", roleIds: ["role2-1"] }
];

const guild2Members = [
    { userId: "user1", roleIds: ["role1-2"] },
    { userId: "user2", roleIds: ["role2-2"] }
];

const guild3Members = [
    { userId: "user3", roleIds: ["role2-3"] }
];

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
            role1_1, role2_1
        ],
        guild1Members
    ),
    new Guild(
        "guild2",
        "Guild 2",
        [
            { identifier: DiscordPermission.MANAGE_CHANNELS, kanbanPermission: [KanbanPermission.CREATE_BOARD, KanbanPermission.EDIT_BOARD, KanbanPermission.DELETE_BOARD] },
            { identifier: DiscordPermission.MANAGE_MESSAGES, kanbanPermission: [KanbanPermission.CREATE_TASKS, KanbanPermission.EDIT_TASKS, KanbanPermission.DELETE_TASKS] },
            { identifier: "role1-2", kanbanPermission: [KanbanPermission.VIEW_BOARD, KanbanPermission.CREATE_BOARD] },
            { identifier: "role2-2", kanbanPermission: [KanbanPermission.CREATE_COLUMNS, KanbanPermission.EDIT_COLUMNS] },
            { identifier: "user2", kanbanPermission: [KanbanPermission.CREATE_BOARD] }
        ],
        [
            role1_2, role2_2
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
            { identifier: "role1-3", kanbanPermission: [KanbanPermission.EDIT_COLUMNS, KanbanPermission.DELETE_COLUMNS] },
            { identifier: "role2-3", kanbanPermission: [KanbanPermission.VIEW_BOARD, KanbanPermission.CREATE_BOARD] },
        ],
        [
            role1_3, role2_3
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
