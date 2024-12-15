import React, { use, useEffect, useState } from 'react';
import { Board } from '../types';
import UserService from '@/services/UserService';
import ColumnService from '@/services/ColumnService';
import { useUser } from '@/context/UserContext';
import { KanbanPermission } from '@/type';
import BoardService from '@/services/BoardService';

interface BoardCardProps {
    board: Board;
    onDelete: (boardId: string) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onDelete }) => {
    const { user } = useUser();
    const [creator, setCreator] = useState<string>('');
    const [columns, setColumns] = useState<string[]>([]);
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            const userData = await UserService.getUser(board.createdByUserId);
            setCreator(userData.globalName);
            const columnData = await Promise.all(board.columnIds.map(async (columnId) => {
                const column = await ColumnService.getColumnById(columnId);
                return column.columnName;
            }));
            setColumns(columnData);
        }

        const checkPermissions = async () => {
            try {
                const permissions = await UserService.getAllKanbanPermissionsForBoard(user!.userId, board.boardId);
                const hasPermission = permissions.includes(KanbanPermission.DELETE_BOARD) || permissions.includes(KanbanPermission.ADMINISTRATOR);
                setCanDelete(hasPermission);
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

    return (
        <div
            className="relative text-white m-3 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3 className="text-lg font-semibold">{board.boardName}</h3>
            <p>Created by: {creator}</p>
            <p>Columns: {columns.join(', ')}</p>
            {canDelete && isHovered && (
                <button 
                    onClick={() => setConfirmingDelete(true)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md"
                >
                    ✕
                </button>
            )}
            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg w-80 text-center">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this board?</p>
                        <p className="text-sm text-gray-300">This action cannot be undone and will remove all related columns and tasks.</p>
                        <div className="flex justify-around mt-4">
                            <button
                                onClick={() => setConfirmingDelete(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardCard;
