import { Guild } from '../model/guild';
import { GuildRepository } from '../repository/guild.db';
import { KanbanPermission, DiscordPermission, PermissionEntry } from '../types';
import { User } from '../model/user';

export class GuildService {
    private guildRepository: GuildRepository;

    constructor() {
        this.guildRepository = new GuildRepository();
    }

    async getGuildById(guildId: string): Promise<Guild> {
        try {
            const guild = await this.guildRepository.getGuildById(guildId);
            if (!guild) {
                throw new Error('Guild not found');
            }
            return guild;
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
        settings: PermissionEntry[],
        user: User
    ): Promise<Guild> {
        // Verify user has admin permissions
        if (!this.userHasAdminPermission(user)) {
            throw new Error('User does not have permission to update guild settings');
        }

        try {
            return await this.guildRepository.updateGuildSettings(guildId, settings);
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
        permissions: PermissionEntry[],
        user: User
    ): Promise<Guild> {
        // Verify user has admin permissions
        if (!this.userHasAdminPermission(user)) {
            throw new Error('User does not have permission to update guild permissions');
        }

        this.validatePermissions(permissions);

        try {
            return await this.guildRepository.updateGuildPermissions(guildId, permissions);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update guild permissions: ${error.message}`);
            } else {
                throw new Error('Failed to update guild permissions: An unknown error occurred');
            }
        }
    }

    private userHasAdminPermission(user: User): boolean {
        const userGuilds = user.getGuilds();
        return userGuilds.some(guild => 
            guild.getPermissions().some(perm => 
                perm.kanbanPermission === KanbanPermission.ADMINISTRATOR ||
                perm.identifier === DiscordPermission.ADMINISTRATOR
            )
        );
    }

    private validatePermissions(permissions: PermissionEntry[]): void {
        // Validate that there's at least one admin permission
        const hasAdmin = permissions.some(perm => 
            perm.kanbanPermission === KanbanPermission.ADMINISTRATOR
        );

        if (!hasAdmin) {
            throw new Error('Permission set must include at least one administrator');
        }

        // Validate all permission entries
        permissions.forEach(perm => {
            if (!perm.identifier) {
                throw new Error('Invalid permission: missing identifier');
            }

            if (!Object.values(KanbanPermission).includes(perm.kanbanPermission)) {
                throw new Error(`Invalid permission type: ${perm.kanbanPermission}`);
            }
        });
    }

    async checkUserGuildPermissions(
        user: User,
        guildId: string,
        requiredPermissions: KanbanPermission[]
    ): Promise<boolean> {
        const guild = await this.getGuildById(guildId);
        
        if (!guild) {
            return false;
        }

        const userPerms = guild.getPermissions().filter(perm => 
            perm.identifier === user.getUserId()
        );

        // Check if user has admin permissions
        if (userPerms.some(perm => perm.kanbanPermission === KanbanPermission.ADMINISTRATOR)) {
            return true;
        }

        // Check for specific required permissions
        return requiredPermissions.every(required =>
            userPerms.some(perm => perm.kanbanPermission === required)
        );
    }
}