import React from 'react';
import { Guild, KanbanPermission, User,DiscordPermission } from '@/types';

interface GuildCardProps {
    guild: Guild;
    onClick: (guildId: string) => void;
    onCreateClick: (guildId: string) => void;
    user: User;
}

const GuildCard: React.FC<GuildCardProps> = ({ guild, onClick, onCreateClick, user }) => {

    // const canCreateBoard = () => {
    //     for (const permission of guild.settings) {
    //         if (permission.identifier === user.userId) {
    //             for (const kanbanPermission of permission.kanbanPermission) {
    //                 if (kanbanPermission === KanbanPermission.CREATE_BOARD || kanbanPermission === KanbanPermission.ADMINISTRATOR) {
    //                     return true;
    //                 }
    //             }
    //         }
    //         const member = guild.members.find((member) => member.userId === user.userId)!;
    //         let allDiscordPermissions: DiscordPermission[] = [];
    //         for (const roleId of member.roleIds) {
    //             const role = guild.roles.find((role) => role.roleId === roleId)!;
    //             for (const permission of role.permissions) {
    //                 if (!allDiscordPermissions.includes(permission)) {
    //                     allDiscordPermissions.push(permission);
    //                 }
    //             }
    //         }
    //         for (const discordPermission of allDiscordPermissions) {
    //             const permissionEntry = guild.settings.find((permission) => permission.identifier === discordPermission);
    //             if (permissionEntry) {
    //                 for (const kanbanPermission of permissionEntry.kanbanPermission) {
    //                     if (kanbanPermission === KanbanPermission.CREATE_BOARD || kanbanPermission === KanbanPermission.ADMINISTRATOR) {
    //                         return true;
    //                     }
    //                 }
    //             }
    //         }

    //     }
    //     return false;
    // }

    return (
        <div
            className="relative p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
            onClick={() => onClick(guild.guildId)}
        >
            <h2 className="text-lg font-bold">{guild.guildName}</h2>
            {/* {canCreateBoard() && (
                <div className="absolute top-2 right-2">
                    <button
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCreateClick(guild.guildId);
                            console.log('Create button clicked for:', guild.guildName);
                        }}
                    >
                        +
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default GuildCard;
