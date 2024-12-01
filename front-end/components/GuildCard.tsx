import React, { useEffect } from 'react';
import { Guild, KanbanPermission, User,DiscordPermission } from '@/types';
import UserService from '@/services/UserService';
import { useUser } from '@/context/UserContext';

interface GuildCardProps {
    guild: Guild;
    onClick: (guild: Guild & {greyedOut?: boolean; inviteLink?: string}) => void;
    onCreateClick: (guildId: string) => void;
}

const GuildCard: React.FC<GuildCardProps> = ({ guild, onClick, onCreateClick }) => {
    const { user } = useUser();
    const [canCreateBoard, setCanCreateBoard] = React.useState(false);
    console.log('Guild:', guild);
    useEffect(() => {
        const checkPermissions = async () => {
            try {
                const userGuildKanbanPermissions = await UserService.getUserGuildKanbanPermissions(user!.userId, guild.guildId);
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
    }, [user!.userId, guild.guildId]);

    return (
        <div
            className={`relative p-4 rounded-lg ${
                guild.greyedOut
                    ? 'bg-gray-800 text-gray-400 cursor-pointer'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}            
            onClick={() => onClick(guild)}
        >
            <div>
                <h2 className="text-lg font-bold">{guild.guildName}</h2>
            </div>
            {guild.greyedOut ? (
                <p className="text-sm">Click to invite bot</p>
            ) : (
                canCreateBoard && (
                    <div className="absolute top-2 right-2">
                    <button
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none w-8 h-8 flex items-center justify-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCreateClick(guild.guildId);
                            console.log('Create button clicked for:', guild.guildName);
                        }}
                    >
                        +
                    </button>
                </div>
                )
            )}
        </div>
    );
};

export default GuildCard;
