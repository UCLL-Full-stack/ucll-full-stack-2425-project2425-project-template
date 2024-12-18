import ColumnService from "@/services/ColumnService";
import { Board, Column } from "@/types";
import { useEffect, useState } from "react";
import ColumnComponent from "./Column";

interface BoardViewProps {
    board: Board;
    onBack: () => void;
}

const BoardView: React.FC<BoardViewProps> = ({ board, onBack }) => {
    const [columns, setColumns] = useState<Column[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const columns = await Promise.all(
                board.columnIds.map((id) => ColumnService.getColumnById(id))
            );
            setColumns(columns);
        };
        fetchData();
    }, [board.columnIds]);
    
    return (
        <div className="p-6 bg-gray-800 text-white min-h-screen">
            <button onClick={onBack} className="text-blue-500 mb-4">
                Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold">{board.boardName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {columns.map((column) => (
                    <ColumnComponent key={column.columnId} column={column} />
                ))}
            </div>
        </div>
    );
};

export default BoardView;