import React, { use, useEffect, useState } from 'react';
import { Board } from '../types';
import UserService from '@/services/UserService';
import ColumnService from '@/services/ColumnService';

interface BoardCardProps {
    board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
    const [creator, setCreator] = useState<string>('');
    const [columns, setColumns] = useState<string[]>([]);
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
        fetchData();
    }, []);

    return (
        <div className="text-white m-3 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
            <h3 className="text-lg font-semibold">{board.boardName}</h3>
            <p>Created by: {creator}</p>
            <p>Columns: {columns.join(', ')}</p>
        </div>
    );
};

export default BoardCard;
