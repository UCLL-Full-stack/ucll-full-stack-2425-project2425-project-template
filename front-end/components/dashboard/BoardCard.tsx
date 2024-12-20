import React, { use, useEffect, useState } from 'react';
import { Board } from '../../types';
import UserService from '@/services/UserService';
import ColumnService from '@/services/ColumnService';
import { useUser } from '@/context/UserContext';
import { KanbanPermission } from '@/types';
import BoardService from '@/services/BoardService';
import { FaPlus, FaGear } from "react-icons/fa6"
import { MdEdit } from "react-icons/md"
import ConfirmationModal from "../ConfirmationModal";
import { useTranslation } from 'react-i18next';

interface BoardCardProps {
    board: Board;
    onDelete: (boardId: string) => void;
    onEdit: (boardId: string) => void;
    onEditPermissions: (boardId: string) => void;
    onSelect: (board: Board) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onDelete, onEdit, onEditPermissions, onSelect }) => {
    const { user } = useUser();
    const [creator, setCreator] = useState<string>('');
    const [columns, setColumns] = useState<string[]>([]);
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [canEditPermissions, setCanEditPermissions] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
    const { t } = useTranslation(['common']);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await UserService.getUser(board.createdByUserId);
            setCreator(userData.globalName);
            const columnData = await Promise.all(board.columnIds.map(async (columnId) => {
                const column = await ColumnService.getColumnById(columnId);
                return column;
            }));
            const sortedColumns = columnData.sort((a, b) => a.columnIndex - b.columnIndex);
            setColumns(sortedColumns.map(column => column.columnName));
        }

        const checkPermissions = async () => {
            try {
                const permissions = await UserService.getAllKanbanPermissionsForBoard(user!.userId, board.boardId);
                const hasDeletePermission = permissions.includes(KanbanPermission.DELETE_BOARD) || permissions.includes(KanbanPermission.ADMINISTRATOR);
                const hasEditPermission = permissions.includes(KanbanPermission.EDIT_BOARD) || permissions.includes(KanbanPermission.ADMINISTRATOR);
                const hasEditPermissionsPermission = permissions.includes(KanbanPermission.MANAGE_BOARD_PERMISSIONS) || permissions.includes(KanbanPermission.ADMINISTRATOR);
                setCanDelete(hasDeletePermission);
                setCanEdit(hasEditPermission);
                setCanEditPermissions(hasEditPermissionsPermission);
            } catch (error) {
                console.error('Error checking permissions:', error);
            }
        };
        fetchData();
        checkPermissions();
    }, [user!.userId, board.boardId, board.createdByUserId, board.columnIds]);

    const handleDelete = async () => {
        setConfirmingDelete(false);
        onDelete(board.boardId);
    }

    const handleEdit = async (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(board.boardId);
    }

    const handleEditPermissions = async (e: React.MouseEvent) => {
        e.stopPropagation();
        onEditPermissions(board.boardId);
    }


    return (
        <div
            className="relative text-white m-3 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelect(board)}
        >
            <h3 className="text-lg font-semibold">{board.boardName}</h3>
            <p>{t("board.createdBy", { creator: creator})}</p>
            <p className="truncate max-w-[70%]">{t('board.columns')}: {columns.join(', ')}</p>
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
            <div
                onClick={(e) => {e.stopPropagation()}}
            >
                <ConfirmationModal
                    isOpen={confirmingDelete}
                    title={t('board.delete.title')}
                    message={t('board.delete.confirmation')}
                    warning={t('board.delete.warning')}
                    onConfirm={handleDelete}
                    onCancel={() => {setConfirmingDelete(false); setIsHovered(false)}}
                />
            </div>
            {(canEdit || canEditPermissions) && (
                <div className="absolute bottom-2 right-2 flex gap-2">
                    {canEdit && (
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
                        >
                            <MdEdit></MdEdit>
                        </button>
                    )}
                    {canEditPermissions && (
                        <button
                            onClick={handleEditPermissions}
                            className="bg-cyan-700 hover:bg-cyan-800 text-white px-3 py-1 rounded-md transition-colors"
                        >
                            <FaGear></FaGear>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BoardCard;
