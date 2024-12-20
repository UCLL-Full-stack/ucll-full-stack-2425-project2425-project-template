import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Board, KanbanPermission } from '@/types';
import { MdEdit } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { useUser } from '@/context/UserContext';
import UserService from '@/services/UserService';

interface BoardCardProps {
    board: Board;
    onDelete: (boardId: string) => void;
    onEdit: (boardId: string) => void;
    onEditPermissions: (boardId: string) => void;
    onSelect: (board: Board) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ 
    board, 
    onDelete, 
    onEdit, 
    onEditPermissions, 
    onSelect 
}) => {
    const { t } = useTranslation(['common', 'board']);
    const { user } = useUser();
    const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<KanbanPermission[]>([]);

    useEffect(() => {
        const fetchPermissions = async () => {
            if (!user?.userId || !board.boardId) return;
            try {
                const userPermissions = await UserService.getUserBoardPermissions(user.userId, board.boardId);
                setPermissions(userPermissions);
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };
        fetchPermissions();
    }, [user?.userId, board.boardId]);

    const canDelete = permissions.includes(KanbanPermission.DELETE_BOARD) || 
                     permissions.includes(KanbanPermission.ADMINISTRATOR);
    const canEdit = permissions.includes(KanbanPermission.EDIT_BOARD) || 
                   permissions.includes(KanbanPermission.ADMINISTRATOR);
    const canEditPermissions = permissions.includes(KanbanPermission.MANAGE_BOARD_PERMISSIONS) || 
                             permissions.includes(KanbanPermission.ADMINISTRATOR);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setConfirmingDelete(false);
        onDelete(board.boardId);
    };

    return (
        <div
            className="relative text-white m-3 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelect(board)}
        >
            <h3 className="text-lg font-semibold">{board.boardName}</h3>
            <p>{t('board.createdBy', { creator: board.creator })}</p>
            <p className="truncate max-w-[70%]">
                {t('board.columns')}: {board.columnIds.join(', ')}
            </p>

            {canDelete && isHovered && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setConfirmingDelete(true);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md"
                >
                    ✕
                </button>
            )}
            
            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg w-80 text-center">
                        <p className="text-lg font-semibold mb-4">
                            {t('board.delete.confirmation')}
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                            {t('board.delete.warning')}
                        </p>
                        <div className="flex justify-around mt-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmingDelete(false);
                                }}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                            >
                                {t('common:actions.cancel')}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                            >
                                {t('common:actions.delete')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {(canEdit || canEditPermissions) && (
                <div className="absolute bottom-2 right-2 flex gap-2">
                    {canEdit && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(board.boardId);
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
                            title={t('common:actions.edit')}
                        >
                            <MdEdit />
                        </button>
                    )}
                    {canEditPermissions && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditPermissions(board.boardId);
                            }}
                            className="bg-cyan-700 hover:bg-cyan-800 text-white px-3 py-1 rounded-md transition-colors"
                            title={t('board.settings')}
                        >
                            <FaGear />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BoardCard;