import BoardService from '@/services/BoardService';
import GuildService from '@/services/GuildService';
import { Board, DiscordPermission, KanbanPermission, PermissionEntry, Role, User } from '@/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface EditBoardSettingsProps {
    boardId: string;
    onClose: () => void;
    onSubmit: (updatedSettings: PermissionEntry[]) => void;
}

const EditBoardSettings: React.FC<EditBoardSettingsProps> = ({ boardId, onClose, onSubmit }) => {
    const { t } = useTranslation(['common', 'board']);
    const [board, setBoard] = useState<Board | null>(null);
    const [boardSettings, setBoardSettings] = useState<PermissionEntry[]>([]);
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showAddIdentifierDropdown, setShowAddIdentifierDropdown] = useState<boolean>(false);
    const [roleMap, setRoleMap] = useState<Map<string, string>>(new Map<string, string>());
    const [userMap, setUserMap] = useState<Map<string, string>>(new Map<string, string>());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const board: Board = await BoardService.getBoard(boardId);
                const users: User[] = await GuildService.getGuildMembers(board.guildId);
                const roles: Role[] = await GuildService.getGuildRoles(board.guildId);
                setBoard(board);
                setBoardSettings(board.permissions);
                setAllUsers(users);
                setAllRoles(roles);

                const newRoleMap = new Map<string, string>();
                const newUserMap = new Map<string, string>();
                roles.forEach(role => newRoleMap.set(role.roleId, role.roleName));
                users.forEach(user => newUserMap.set(user.userId, user.globalName));
                setRoleMap(newRoleMap);
                setUserMap(newUserMap);
            } catch (error) {
                console.error('Error fetching board settings:', error);
            }
        };
        fetchData();
    }, [boardId]);

    const availableKanbanPermissions = Object.values(KanbanPermission);

    const resolveIdentifierName = (identifier: string): string => {
        if (roleMap.has(identifier)) return t('permissions.role', { name: roleMap.get(identifier) });
        if (userMap.has(identifier)) return t('permissions.user', { name: userMap.get(identifier) });
        if (Object.values(DiscordPermission).includes(identifier as DiscordPermission))
            return t('permissions.discord', { permission: identifier });
        return identifier;
    };

    const handleRemovePermission = (identifier: string, permission: KanbanPermission) => {
        setBoardSettings(prev =>
            prev.map(entry =>
                entry.identifier === identifier
                    ? { ...entry, kanbanPermission: entry.kanbanPermission.filter(p => p !== permission) }
                    : entry
            )
        );
    };

    const handleAddPermission = (identifier: string, permission: KanbanPermission) => {
        setBoardSettings(prev =>
            prev.map(entry =>
                entry.identifier === identifier
                    ? { ...entry, kanbanPermission: [...entry.kanbanPermission, permission] }
                    : entry
            )
        );
    };

    const handleAddIdentifier = (identifier: string) => {
        setBoardSettings(prev => [...prev, { identifier, kanbanPermission: [] }]);
        setShowAddIdentifierDropdown(false);
    };

    const filteredOptions = () => {
        const selectedIdentifiers = new Set(boardSettings.map(entry => entry.identifier));
        const query = searchQuery.toLowerCase();
        
        const roles = allRoles
            .filter(role => role.roleName.toLowerCase().includes(query) && !selectedIdentifiers.has(role.roleId))
            .map(role => ({ label: t('permissions.roleLabel', { name: role.roleName }), value: role.roleId }));

        const users = allUsers
            .filter(user => user.username.toLowerCase().includes(query) && !selectedIdentifiers.has(user.userId))
            .map(user => ({ label: t('permissions.userLabel', { name: user.globalName }), value: user.userId }));

        const discordPermissions = Object.values(DiscordPermission)
            .filter(p => p.toLowerCase().includes(query) && !selectedIdentifiers.has(p))
            .map(p => ({ label: t('permissions.discordLabel', { permission: p }), value: p }));

        return [...roles, ...users, ...discordPermissions];
    };

    const handleRemoveIdentifier = (identifier: string) => {
        setBoardSettings(prev => prev.filter(entry => entry.identifier !== identifier));
    };

    const handleSubmit = async () => {
        const validSettings = boardSettings.every(entry => entry.kanbanPermission.length > 0);
        if (!validSettings) {
            alert(t('permissions.errors.noPermissions'));
            return;
        }
        onSubmit(boardSettings);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2C2F33] p-6 rounded-lg shadow-lg w-1/2 text-white">
                <h2 className="text-2xl font-bold mb-4">
                    {t('board.permissions.title', { name: board?.boardName })}
                </h2>
                
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {boardSettings.map(entry => (
                        <div
                            key={entry.identifier}
                            className="p-4 bg-gray-800 rounded-lg"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">{resolveIdentifierName(entry.identifier)}</span>
                                {entry.identifier !== DiscordPermission.ADMINISTRATOR && (
                                    <button
                                        onClick={() => handleRemoveIdentifier(entry.identifier)}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        {t('actions.delete')}
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {availableKanbanPermissions.map(permission => (
                                    <label
                                        key={permission}
                                        className="flex items-center space-x-2 bg-gray-700 p-2 rounded"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={entry.kanbanPermission.includes(permission)}
                                            onChange={(e) =>
                                                e.target.checked
                                                    ? handleAddPermission(entry.identifier, permission)
                                                    : handleRemovePermission(entry.identifier, permission)
                                            }
                                            className="form-checkbox"
                                        />
                                        <span>{permission}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setShowAddIdentifierDropdown(true)}
                >
                    {t('permissions.addIdentifier')}
                </button>

                {showAddIdentifierDropdown && (
                    <div className="mt-2 bg-gray-800 rounded-lg p-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('permissions.searchPlaceholder')}
                            className="w-full p-2 bg-gray-700 rounded mb-2"
                        />
                        <div className="max-h-40 overflow-y-auto">
                            {filteredOptions().map(option => (
                                <div
                                    key={option.value}
                                    onClick={() => handleAddIdentifier(option.value)}
                                    className="p-2 hover:bg-gray-700 cursor-pointer rounded"
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end mt-6 gap-2">
                    <button 
                        className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                        onClick={onClose}
                    >
                        {t('actions.cancel')}
                    </button>
                    <button 
                        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        {t('actions.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBoardSettings;