import { Role } from '../model/role';
import roleDb from '../repository/role.db';

const getAllRoles = () => {
    return roleDb.getAllRoles();
}

const getRole = (roleId: string) => {
    return roleDb.getRoleById(roleId);
}

const createRole = (role: Role) => {
    roleDb.addRole(role);
}

const updateRole = (roleId: string, updatedRole: Role) => {
    roleDb.updateRole(roleId, updatedRole);
}

const deleteRole = (roleId: string) => {
    roleDb.removeRole(roleId);
}

export default {
    getAllRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
};
