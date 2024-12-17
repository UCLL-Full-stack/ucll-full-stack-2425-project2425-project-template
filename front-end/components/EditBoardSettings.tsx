import { DiscordPermission, Guild, KanbanPermission, PermissionEntry, User } from '@/types';
import React, { useEffect, useState } from 'react';

interface EditBoardSettingsProps {
    boardId: string;
    onClose: () => void;
    onSubmit: (updatedPermissions: PermissionEntry[]) => void;
}

const EditBoardSettings: React.FC<EditBoardSettingsProps> = ({ boardId, onClose, onSubmit }) => {

    return (
        <div>
            <h1>Edit Board Settings</h1>
        </div>
    )
}

export default EditBoardSettings;