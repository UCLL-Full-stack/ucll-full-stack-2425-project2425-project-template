import GuildService from "@/services/GuildService";
import { DiscordPermission, Guild, KanbanPermission, PermissionEntry, Role, User } from "@/types";
import React, { useEffect, useState } from "react";

interface EditGuildSettingsFormProps {
    guildId: string;
    onClose: () => void;
}

const EditGuildSettingsForm: React.FC<EditGuildSettingsFormProps> = ({ guildId, onClose }) => {
    const [guild, setGuild] = useState<Guild | null>(null);
    const [guildSettings, setGuildSettings] = useState<PermissionEntry[]>([]);
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showAddIdentifierDropdown, setShowAddIdentifierDropdown] = useState(false);
    const [roleMap, setRoleMap] = useState<Map<string, string>>(new Map<string, string>());
    const [userMap, setUserMap] = useState<Map<string, string>>(new Map<string, string>());

    useEffect(() => {
        const fetchData = async () => {
            const guild: Guild = await GuildService.getGuild(guildId);
            const users: User[] = await GuildService.getGuildMembers(guildId);
            const roles: Role[] = await GuildService.getGuildRoles(guildId);
            setGuild(guild);
            setGuildSettings(guild.settings);
            setAllUsers(users);
            setAllRoles(roles);

            roles.forEach(role => roleMap.set(role.roleId, role.roleName));
            users.forEach(user => userMap.set(user.userId, user.globalName));
        }

        fetchData();
    }, [guildId]);

    const availableKanbanPermissions = Object.values(KanbanPermission);

    const resolveIdentifierName = (identifier: string): string => {
        if (roleMap.has(identifier)) return `Role: ${roleMap.get(identifier)}`;
        if (userMap.has(identifier)) return `User: ${userMap.get(identifier)}`;
        if (Object.values(DiscordPermission).includes(identifier as DiscordPermission))
            return `Permission: ${identifier}`;
        return identifier;
    };

    const handleRemovePermission = (identifier: string, permission: KanbanPermission) => {
        setGuildSettings(prev =>
            prev.map(entry =>
                entry.identifier === identifier
                    ? { ...entry, kanbanPermission: entry.kanbanPermission.filter(p => p !== permission) }
                    : entry
            )
        );
    };

    const handleAddPermission = (identifier: string, permission: KanbanPermission) => {
        setGuildSettings(prev =>
            prev.map(entry =>
                entry.identifier === identifier
                    ? { ...entry, kanbanPermission: [...entry.kanbanPermission, permission] }
                    : entry
            )
        );
    };

    const handleAddIdentifier = (identifier: string) => {
        setGuildSettings((prev) => [
            ...prev,
            { identifier, kanbanPermission: [] },
        ]);
        setShowAddIdentifierDropdown(false);
    };

    const filteredOptions = () => {
        const selectedIdentifiers = new Set(guildSettings.map(entry => entry.identifier));
        const query = searchQuery.toLowerCase();
        const roles = allRoles
            .filter(role => role.roleName.toLowerCase().includes(query) && !selectedIdentifiers.has(role.roleId))
            .map(role => ({ label: `Role: ${role.roleName}`, value: role.roleId }));

        const users = allUsers
            .filter(user => user.username.toLowerCase().includes(query) && !selectedIdentifiers.has(user.userId))
            .map(user => ({ label: `User: ${user.globalName}`, value: user.userId }));

        const discordPermissions = Object.values(DiscordPermission)
            .filter(
                p =>
                    p.toLowerCase().includes(query) &&
                    !selectedIdentifiers.has(p)
            )
            .map(p => ({ label: `Permission: ${p}`, value: p }));

        return [...roles, ...users, ...discordPermissions];
    };

    const handleRemoveIdentifier = (identifier: string) => {
        setGuildSettings(prev => prev.filter(entry => entry.identifier !== identifier));
    };

    const handleSubmit = async () => {
        console.log(guildSettings);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2C2F33] p-6 rounded-lg shadow-lg w-1/2 text-white">
                <h2 className="text-2xl font-bold mb-4">Edit Settings for {guild?.guildName}</h2>
                <p className="text-sm text-gray-300 mb-2">New boards are created with the server settings</p>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {guildSettings.map(entry => (
                        <div
                            key={entry.identifier}
                            className={`p-4 bg-gray-800 rounded-lg ${
                                entry.identifier === DiscordPermission.ADMINISTRATOR ? "opacity-50" : ""
                            }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">{resolveIdentifierName(entry.identifier)}</span>
                                {entry.identifier !== DiscordPermission.ADMINISTRATOR && (
                                    <button
                                        className="px-2 py-1 rounded hover:text-red-600"
                                        onClick={() => handleRemoveIdentifier(entry.identifier)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {entry.kanbanPermission.map(permission => (
                                    <div
                                        key={permission}
                                        className="bg-gray-700 px-3 py-1 rounded flex items-center"
                                    >
                                        <span>{permission}</span>
                                        {entry.identifier !== DiscordPermission.ADMINISTRATOR && (
                                            <button
                                                className="ml-2 text-grey-500 hover:text-red-600"
                                                onClick={() => handleRemovePermission(entry.identifier, permission)}
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {entry.identifier !== DiscordPermission.ADMINISTRATOR && (
                                    <button
                                        className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
                                        onClick={() => setSelectedIdentifier(entry.identifier)}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                            {selectedIdentifier === entry.identifier && (
                                <select
                                    className="mt-2 bg-gray-700 text-white p-2 rounded"
                                    onChange={e => {
                                        handleAddPermission(entry.identifier, e.target.value as KanbanPermission);
                                        setSelectedIdentifier(null);
                                    }}
                                >
                                    <option value="">Select Permission</option>
                                    {availableKanbanPermissions
                                        .filter(p => !entry.kanbanPermission.includes(p))
                                        .map(p => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>

                {showAddIdentifierDropdown ? (
                    <div className="mt-4 bg-gray-800 p-4 rounded">
                        <input
                            type="text"
                            placeholder="Search users, roles, or permissions"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full p-2 bg-gray-700 rounded text-white"
                        />
                        <ul className="mt-2 max-h-40 overflow-y-auto">
                            {filteredOptions().map(option => (
                                <li
                                    key={option.value}
                                    className="p-2 hover:bg-gray-700 cursor-pointer rounded"
                                    onClick={() => handleAddIdentifier(option.value)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <button
                        className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => setShowAddIdentifierDropdown(true)}
                    >
                        Add Identifier
                    </button>
                )}

                <div className="flex justify-end mt-6">
                    <button className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 mr-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditGuildSettingsForm;