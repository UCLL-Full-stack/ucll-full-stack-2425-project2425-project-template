import { DiscordPermission, Guild, KanbanPermission, User } from '@/types';
import React, { useEffect, useState } from 'react';
import PermissionsEntryForm from './PermissionEntryForm';

interface CreateBoardFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { boardName: string; columns: string[]; guild: string }) => void;
    selectedGuildId?: string | null;
    user: User;
    guilds: Guild[];
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    user,
    selectedGuildId,
    guilds,
}) => {
    const [boardName, setBoardName] = useState('');
    const [columns, setColumns] = useState('');
    const [selectedGuild, setSelectedGuild] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof selectedGuildId === 'string') {
            setSelectedGuild(selectedGuildId);
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
            guild: selectedGuild || '',
            columns: columnsArray
        });
        setBoardName('');
        setColumns('');
        setSelectedGuild(null);
        onClose();
    };

    const canCreateBoardForGuild = (guild: Guild) => {
        for (const permission of guild.settings) {
            if (permission.identifier === user.userId) {
                for (const kanbanPermission of permission.kanbanPermission) {
                    if (
                        kanbanPermission === KanbanPermission.CREATE_BOARD ||
                        kanbanPermission === KanbanPermission.ADMINISTRATOR
                    ) {
                        return true;
                    }
                }
            }

            const member = guild.members.find((member) => member.userId === user.userId);
            if (!member) continue;

            let allDiscordPermissions: DiscordPermission[] = [];
            for (const roleId of member.roleIds) {
                const role = guild.roles.find((role) => role.roleId === roleId);
                if (role) {
                    allDiscordPermissions.push(...role.permissions);
                }
            }

            for (const discordPermission of allDiscordPermissions) {
                const permissionEntry = guild.settings.find(
                    (permission) => permission.identifier === discordPermission
                );
                if (permissionEntry) {
                    for (const kanbanPermission of permissionEntry.kanbanPermission) {
                        if (
                            kanbanPermission === KanbanPermission.CREATE_BOARD ||
                            kanbanPermission === KanbanPermission.ADMINISTRATOR
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
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
                            {guilds.filter(canCreateBoardForGuild).map((guild) => (
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
