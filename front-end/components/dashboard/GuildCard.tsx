import React, { useEffect } from 'react';
import { Guild, KanbanPermission, User,DiscordPermission } from '@/types';
import UserService from '@/services/UserService';
import { useUser } from '@/context/UserContext';
import { FaPlus, FaGear } from "react-icons/fa6"
import { useTranslation } from 'react-i18next';

interface GuildCardProps {
    guild: Guild;
    onClick: (guild: Guild & {greyedOut?: boolean; inviteLink?: string}) => void;
    onCreateClick: (guildId: string) => void;
    onGuildSettingsClick: (guildId: string) => void;
    permissions: any[];
}

const GuildCard: React.FC<GuildCardProps> = ({ guild, onClick, onCreateClick, onGuildSettingsClick, permissions }) => {
    const { user } = useUser();
    const [canCreateBoard, setCanCreateBoard] = React.useState(false);
    const [canEditSettings, setCanEditSettings] = React.useState(false);
    const { t } = useTranslation(['common']);
    // console.log('Guild:', guild);
    useEffect(() => {
        const checkPermissions = async () => {
            try {
                if( guild.greyedOut) return;
                const userGuildKanbanPermissions = await UserService.getUserGuildKanbanPermissions(user!.userId, guild.guildId);
                // console.log('User guild kanban permissions:', userGuildKanbanPermissions);
                const hasPermission = userGuildKanbanPermissions.includes(KanbanPermission.CREATE_BOARD) ||
                userGuildKanbanPermissions.includes(KanbanPermission.ADMINISTRATOR);
                setCanCreateBoard(hasPermission);
                const hasEditSettingsPermission = userGuildKanbanPermissions.includes(KanbanPermission.MANAGE_GUILD_SETTINGS) ||userGuildKanbanPermissions.includes(KanbanPermission.ADMINISTRATOR);
                setCanEditSettings(hasEditSettingsPermission);
                // console.log('User can create board:', hasPermission);
            } catch (error) {
                console.error('Error checking permissions:', error);
            }
        };

        checkPermissions();
    }, [user!.userId, guild.guildId, permissions]);

    const handleEditSettings = async () => {
        onGuildSettingsClick(guild.guildId);
    }

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
                <p className="text-sm">{t("dashboard.guildInvite")}</p>
            ) : (
                (canCreateBoard || canEditSettings) && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                        {canCreateBoard && (
                            <button
                                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none w-8 h-8 flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCreateClick(guild.guildId);
                                    console.log('Create button clicked for:', guild.guildName);
                                }}
                            >
                                <FaPlus></FaPlus>
                            </button>
                        )}
                        {canEditSettings && (
                            <button
                                className="bg-cyan-700 text-white p-2 rounded-full hover:bg-cyan-800 focus:outline-none w-8 h-8 flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditSettings();
                                    console.log('Edit button clicked for:', guild.guildName);
                                }}
                            >
                                <FaGear></FaGear>
                            </button>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default GuildCard;
