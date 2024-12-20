import { Role } from "../model/role";
import { DiscordPermission } from "../types";
import database from "./database";

const getAllRoles = async (): Promise<Role[]> => {
    try {
        const rolePrisma = await database.role.findMany({
            include: {
                guild: {
                    select: { guildId: true }
                }
            }
        });
        return rolePrisma.map((rolePrisma) => {
            const guildId = rolePrisma.guild?.guildId || "";
            const role = Role.from(rolePrisma);
            role.setGuildId(guildId);
            return role;
        });
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};

const getRoleById = async (roleId: string): Promise<Role> => {
    const rolePrisma = await database.role.findUnique({
        where: { roleId },
        include: {
            guild: {
                select: { guildId: true }
            }
        }
    });
    if (!rolePrisma) {
        throw new Error("Role not found");
    }
    const guildId = rolePrisma.guild?.guildId || "";
    const role = Role.from(rolePrisma);
    role.setGuildId(guildId);
    return role;
};

const addRole = async (roleData: {
    roleId: string;
    roleName: string;
    permissions: DiscordPermission[];
    guildId: string;
}): Promise<Role> => {
    try {
        const { roleId, roleName, permissions = [], guildId } = roleData;
        const permissionsJson = JSON.stringify(permissions);
        const newRolePrisma = await database.role.create({
            data: {
                roleId,
                roleName,
                permissions: permissionsJson,
                guild: {
                    connect: { guildId }
                }
            },
            include: {
                guild: {
                    select: { guildId: true }
                }
            }
        });
        const newRole = Role.from(newRolePrisma);
        newRole.setGuildId(newRolePrisma.guild?.guildId || "");
        return newRole;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
}

const updateRole = async (
    roleId: string,
    updateData: {
      roleName?: string;
      permissions?: DiscordPermission[];
      guildId?: string;
    }
  ): Promise<Role> => {
    try {
        const { roleName, permissions, guildId } = updateData;
        const data: any = {};
        if (roleName !== undefined) data.roleName = roleName;
        if (permissions !== undefined) {
            data.permissions = JSON.stringify(permissions);
        }
        if (guildId !== undefined) {
            data.guild = { connect: { guildId } };
        }
        const updatedRolePrisma = await database.role.update({
            where: { roleId },
            data,
            include: {
                guild: { select: { guildId: true } },
            },
        });
        const updatedRole = Role.from(updatedRolePrisma);
        updatedRole.setGuildId(updatedRolePrisma.guild?.guildId || "");
        return updatedRole;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};

const deleteRole = async (roleId: string): Promise<void> => {
    const role = await database.role.findUnique({ where: { roleId } });
    if (!role) {
        throw new Error("Role not found");
    }
    await database.role.delete({ where: { roleId } });
}

export default {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole,
    deleteRole
};
