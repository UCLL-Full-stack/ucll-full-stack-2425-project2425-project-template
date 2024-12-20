import { Role } from "../model/role";
import roleDb from "../repository/role.db";
import { CreateRoleInput, DiscordPermission, UpdateRoleInput } from "../types";


const getAllRoles = async (): Promise<Role[]> => {
    return await roleDb.getAllRoles();
}

const getRoleById = async (roleId: string): Promise<Role> => {
    return await roleDb.getRoleById(roleId);
}

const addRole = async (roleData: CreateRoleInput): Promise<Role> => {
    return await roleDb.addRole(roleData);
}

const updateRole = async (roleId: string, roleData: UpdateRoleInput): Promise<Role> => {
    return await roleDb.updateRole(roleId, roleData);
}

const deleteRole = async (roleId: string): Promise<void> => {
    return await roleDb.deleteRole(roleId);
}

export default {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole,
    deleteRole
}