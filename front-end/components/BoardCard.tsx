import React from 'react';
import { Board } from '../types';

interface BoardCardProps {
    board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
    return (
        <div className="text-white m-3 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
            <h3 className="text-lg font-semibold">{board.boardName}</h3>
            <p>Created by: {board.createdByUser}</p>
            <p>Columns: {board.columns.length}</p>
            <ul className="mt-2">
                {board.columns.map(column => (
                    <li key={column.columnId}>{column.columnName}</li>
                ))}
            </ul>
        </div>
    );
};

export default BoardCard;
