import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Guild, KanbanPermission } from '@/types';
import { FaPlus, FaGear } from "react-icons/fa6";
import { useUser } from '@/context/UserContext';
import UserService from '@/services/UserService';

interface GuildCardProps {
    guild: Guild;
    onClick: (guild: Guild & {greyedOut?: boolean; inviteLink?: string}) => void;
    onCreateClick: (guildId: string) => void;
    onGuildSettingsClick: (guildId: string) => void;
}

const GuildCard: React.FC<GuildCardProps> = ({
    guild,
    onClick,
    onCreateClick,
    onGuildSettingsClick
}) => {
    const { t } = useTranslation(['common']);
    const { user } = useUser();
    const [canCreateBoard, setCanCreateBoard] = React.useState(false);
    const [canEditSettings, setCanEditSettings] = React.useState(false);

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                if (guild.greyedOut) return;
                const userGuildKanbanPermissions = await UserService.getUserGuildKanbanPermissions(user!.userId, guild.guildId);
                
                const hasPermission = userGuildKanbanPermissions.includes(KanbanPermission.CREATE_BOARD) ||
                    userGuildKanbanPermissions.includes(KanbanPermission.ADMINISTRATOR);
                setCanCreateBoard(hasPermission);
                
                const hasEditSettingsPermission = userGuildKanbanPermissions.includes(KanbanPermission.MANAGE_GUILD_SETTINGS) ||
                    userGuildKanbanPermissions.includes(KanbanPermission.ADMINISTRATOR);
                setCanEditSettings(hasEditSettingsPermission);
            } catch (error) {
                console.error('Error checking permissions:', error);
            }
        };

        checkPermissions();
    }, [user?.userId, guild.guildId]);

    return (
        <div
            className={`relative p-4 rounded-lg ${
                guild.greyedOut
                    ? 'bg-gray-800 text-gray-400 cursor-pointer'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}            
            onClick={() => onClick(guild)}
        >
            <h2 className="text-lg font-bold">{guild.guildName}</h2>
            {guild.greyedOut ? (
                <p className="text-sm">{t('guild.inviteBot')}</p>
            ) : (
                (canCreateBoard || canEditSettings) && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                        {canCreateBoard && (
                            <button
                                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCreateClick(guild.guildId);
                                }}
                                title={t('actions.create')}
                            >
                                <FaPlus />
                            </button>
                        )}
                        {canEditSettings && (
                            <button
                                className="bg-cyan-700 text-white p-2 rounded-full hover:bg-cyan-800"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onGuildSettingsClick(guild.guildId);
                                }}
                                title={t('guild.settings.title')}
                            >
                                <FaGear />
                            </button>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default GuildCard;