import { DiscordPermission, Guild, KanbanPermission, User } from '@/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateBoardFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { boardName: string; columns: string[]; guild: string }) => void;
    selectedGuildId?: string | null;
    user: User;
    guilds: Guild[];
    permissions: any[];
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    user,
    selectedGuildId,
    guilds,
    permissions,
}) => {
    const { t } = useTranslation(['common']);
    const [boardName, setBoardName] = useState('');
    const [columns, setColumns] = useState('');
    const [selectedGuild, setSelectedGuild] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [filteredGuilds, setFilteredGuilds] = useState<Guild[]>(guilds);

    useEffect(() => {
        setSelectedGuild(null);
        setError(null);
        setBoardName('');
        setColumns('');
        setFilteredGuilds([]);
        if (typeof selectedGuildId === 'string') {
            setSelectedGuild(selectedGuildId);
        }
        for (const guild of guilds) {
            const guildPermissions = permissions.find(
                (permission) => permission.guildId === guild.guildId
            );
            const hasPermission = guildPermissions.permissions.some(
                (permission: KanbanPermission) =>
                    permission === KanbanPermission.CREATE_BOARD ||
                    permission === KanbanPermission.ADMINISTRATOR
            );
            if (!hasPermission) {
                setFilteredGuilds((prevGuilds) => prevGuilds.filter((g) => g.guildId !== guild.guildId));
            } else {
                if (!filteredGuilds.includes(guild)) {
                    setFilteredGuilds((prevGuilds) => [...prevGuilds, guild]);
                }
            }
        }
    }, [selectedGuildId, guilds, permissions]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedGuild) {
            setError(t('errors.selectGuild'));
            return;
        }
        setError(null);
        const columnsArray = columns.split(',').map(column => column.trim()).filter(column => column !== '');
        onSubmit({
            boardName,
            guild: selectedGuild,
            columns: columnsArray
        });
        setBoardName('');
        setColumns('');
        setSelectedGuild(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-white text-xl mb-4">{t('board.create.title')}</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white mb-2">
                            {t('board.create.nameLabel')}
                        </label>
                        <input
                            type="text"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-600 rounded"
                            placeholder={t('board.create.namePlaceholder')}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">
                            {t('board.create.guildLabel')}
                        </label>
                        <select
                            onChange={(e) =>{setSelectedGuild(e.target.value)}}
                            className="w-full p-2 border border-gray-600 rounded"
                            value={selectedGuild || ''}
                        >
                            <option value="" disabled>
                                {t('board.create.selectGuild')}
                            </option>
                            {filteredGuilds.map((guild) => (
                                <option key={guild.guildId} value={guild.guildId}>
                                    {guild.guildName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">
                            {t('board.create.columnsLabel')}
                        </label>
                        <input
                            type="text"
                            value={columns}
                            onChange={(e) => setColumns(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded"
                            placeholder={t('board.create.columnPlaceholder')}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
                        >
                            {t('actions.cancel')}
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {t('actions.create')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBoardForm;