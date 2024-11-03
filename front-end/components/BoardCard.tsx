import React from 'react';
import { Board } from '../types';

interface BoardCardProps {
    board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
    return (
        <div className="m-3 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
            <h3 className="text-lg font-semibold">{board.boardName}</h3>
        </div>
    );
};

export default BoardCard;
