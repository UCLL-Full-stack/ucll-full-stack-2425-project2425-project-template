import { PrismaClient } from '@prisma/client';
import { Guild } from '../model/guild';
import { Role } from '../model/role';
import { PermissionEntry } from '../types';

const prisma = new PrismaClient();

export class GuildRepository {
    async getGuildById(guildId: string): Promise<Guild | null> {
        try {
            const guildData = await prisma.guild.findUnique({
                where: { id: guildId },
                include: {
                    roles: true,
                    users: true
                }
            });

            if (!guildData) {
                return null;
            }

            const roles = guildData.roles.map((role: any) => 
                new Role(
                    role.id,
                    role.name,
                    JSON.parse(role.permissions)
                )
            );

            return new Guild(
                guildData.id,
                guildData.name,
                JSON.parse(guildData.permissions),
                JSON.parse(guildData.settings),
                roles
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch guild: ${error.message}`);
            } else {
                throw new Error('Failed to fetch guild: An unknown error occurred');
            }
        }
    }

    async updateGuildSettings(
        guildId: string,
        settings: PermissionEntry[]
    ): Promise<Guild> {
        try {
            const updatedGuild = await prisma.guild.update({
                where: { id: guildId },
                data: {
                    settings: JSON.stringify(settings)
                },
                include: {
                    roles: true
                }
            });

            const roles = updatedGuild.roles.map((role: any) => 
                new Role(
                    role.id,
                    role.name,
                    JSON.parse(role.permissions)
                )
            );

            return new Guild(
                updatedGuild.id,
                updatedGuild.name,
                JSON.parse(updatedGuild.permissions),
                JSON.parse(updatedGuild.settings),
                roles
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update guild settings: ${error.message}`);
            } else {
                throw new Error('Failed to update guild settings: An unknown error occurred');
            }
        }
    }

    async updateGuildPermissions(
        guildId: string,
        permissions: PermissionEntry[]
    ): Promise<Guild> {
        try {
            const updatedGuild = await prisma.guild.update({
                where: { id: guildId },
                data: {
                    permissions: JSON.stringify(permissions)
                },
                include: {
                    roles: true
                }
            });

            const roles = updatedGuild.roles.map((role: any) => 
                new Role(
                    role.id,
                    role.name,
                    JSON.parse(role.permissions)
                )
            );

            return new Guild(
                updatedGuild.id,
                updatedGuild.name,
                JSON.parse(updatedGuild.permissions),
                JSON.parse(updatedGuild.settings),
                roles
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update guild permissions: ${error.message}`);
            } else {
                throw new Error('Failed to update guild permissions: An unknown error occurred');
            }
        }
    }
}