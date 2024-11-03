import React, { useState } from 'react';
import { DiscordPermission, KanbanPermission, Guild } from '@/types';

interface PermissionsEntryFormProps {
    guild: Guild;
    onAdd: (entry: { identifier: string | DiscordPermission; kanbanPermissions: KanbanPermission[] }) => void;
    onCancel: () => void;
}

const PermissionsEntryForm: React.FC<PermissionsEntryFormProps> = ({
    guild,
    onAdd,
    onCancel,
}) => {
    const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(null);
    const [selectedKanbanPermissions, setSelectedKanbanPermissions] = useState<KanbanPermission[]>([]);

    const handleIdentifierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIdentifier(e.target.value);
    };

    const handleKanbanPermissionChange = (permission: KanbanPermission) => {
        setSelectedKanbanPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((perm) => perm !== permission)
                : [...prev, permission]
        );
    };

    const handleSubmit = () => {
        if (selectedIdentifier && selectedKanbanPermissions.length > 0) {
            onAdd({ identifier: selectedIdentifier, kanbanPermissions: selectedKanbanPermissions });
            setSelectedIdentifier(null);
            setSelectedKanbanPermissions([]);
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-white mb-2">Add Permission Entry</h3>
            <div className="mb-4">
                <label className="block text-white mb-1">Select Identifier</label>
                <select value={selectedIdentifier || ''} onChange={handleIdentifierChange} className="w-full p-2 border border-gray-600 rounded">
                    <option value="" disabled>Select a user or role</option>
                    {guild.members.map((member) => (
                        <option key={member.userId} value={member.userId}>
                            {member.userId} (User)
                        </option>
                    ))}
                    {guild.roles.map((role) => (
                        <option key={role.roleId} value={role.roleId}>
                            {role.roleId} (Role)
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-white mb-1">Select Kanban Permissions</label>
                {Object.values(KanbanPermission).map((permission) => (
                    <div key={permission} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedKanbanPermissions.includes(permission)}
                            onChange={() => handleKanbanPermissionChange(permission)}
                        />
                        <span className="ml-2 text-white">{permission}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Complete</button>
            </div>
        </div>
    );
};

export default PermissionsEntryForm;
