import { DiscordPermission, Guild, KanbanPermission, User } from '@/types';
import React, { useEffect, useState } from 'react';

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
        setFilteredGuilds(guilds);
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
    }, [selectedGuildId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedGuild) {
            setError('Please select a guild');
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
                <h2 className="text-white text-xl mb-4">Create a New Board</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Board Title</label>
                        <input
                            type="text"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-600 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Select Guild</label>
                        <select
                            onChange={(e) =>{setSelectedGuild(e.target.value)}}
                            className="w-full p-2 border border-gray-600 rounded"
                            value={selectedGuild || ''}
                        >
                            <option value="" disabled>
                                Select a guild
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
                            Columns (separated by commas)
                        </label>
                        <input
                            type="text"
                            value={columns}
                            onChange={(e) => setColumns(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Create Board
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBoardForm;
