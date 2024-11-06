import { Role } from "../model/role";
import { DiscordPermission } from "../types";

const roles: Role[] = [
    // new Role("role1-1", "Role 1-1", [DiscordPermission.ADMINISTRATOR]),
    // new Role("role2-1", "Role 2-1", [DiscordPermission.MANAGE_CHANNELS, DiscordPermission.BAN_MEMBERS]),
    // new Role("role1-2", "Role 1-2", [DiscordPermission.VIEW_CHANNEL]),
    // new Role("role2-2", "Role 2-2", [DiscordPermission.SEND_MESSAGES, DiscordPermission.ADD_REACTIONS]),
    // new Role("role1-3", "Role 1-3", [DiscordPermission.MANAGE_ROLES]),
    // new Role("role2-3", "Role 2-3", [DiscordPermission.KICK_MEMBERS, DiscordPermission.MODERATE_MEMBERS]),
];

const getAllRoles = (): Role[] => {
    return roles;
};

const getRoleById = (roleId: string): Role | null => {
    return roles.find(role => role.getRoleId() === roleId) || null;
};

const addRole = (role: Role): void => {
    const existingRole = getRoleById(role.getRoleId());
    if (existingRole) {
        throw new Error(`Role with ID ${role.getRoleId()} already exists.`);
    }
    roles.push(role);
};

const updateRole = (roleId: string, updatedRole: Role): void => {
    const roleIndex = roles.findIndex(role => role.getRoleId() === roleId);
    if (roleIndex === -1) {
        throw new Error(`Role with ID ${roleId} does not exist.`);
    }

    const role = roles[roleIndex];
    role.setRoleName(updatedRole.getRoleName());
    role.setPermissions(updatedRole.getPermissions());
};

const removeRole = (roleId: string): void => {
    const roleIndex = roles.findIndex(role => role.getRoleId() === roleId);
    if (roleIndex === -1) {
        throw new Error(`Role with ID ${roleId} does not exist.`);
    }
    roles.splice(roleIndex, 1);
};

export default {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole,
    removeRole,
};
