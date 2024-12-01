import React, { useEffect } from 'react';
import { Guild, KanbanPermission, User,DiscordPermission } from '@/types';
import UserService from '@/services/UserService';

interface GuildCardProps {
    guild: Guild;
    onClick: (guildId: string) => void;
    onCreateClick: (guildId: string) => void;
    user: User;
}

const GuildCard: React.FC<GuildCardProps> = ({ guild, onClick, onCreateClick, user }) => {
    const [canCreateBoard, setCanCreateBoard] = React.useState(false);

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                const userGuildKanbanPermissions = await UserService.getUserGuildKanbanPermissions(user.userId, guild.guildId);
                // console.log('User guild kanban permissions:', userGuildKanbanPermissions);
                const hasPermission = userGuildKanbanPermissions.includes(KanbanPermission.CREATE_BOARD) ||
                userGuildKanbanPermissions.includes(KanbanPermission.ADMINISTRATOR);
                setCanCreateBoard(hasPermission);
                // console.log('User can create board:', hasPermission);
            } catch (error) {
                console.error('Error checking permissions:', error);
            }
        };

        checkPermissions();
    }, [user.userId, guild.guildId]);

    return (
        <div
            className="relative p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
            onClick={() => onClick(guild.guildId)}
        >
            <h2 className="text-lg font-bold">{guild.guildName}</h2>
            {canCreateBoard && (
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
            )}
        </div>
    );
};

export default GuildCard;
