import ColumnService from "@/services/ColumnService";
import { Board, Column } from "@/types";
import { useEffect, useState } from "react";
import ColumnComponent from "./Column";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BoardService from "@/services/BoardService";

interface BoardViewProps {
    board: Board;
}

const BoardView: React.FC<BoardViewProps> = ({ board }) => {
    const [columns, setColumns] = useState<Column[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedColumns = await Promise.all(
                board.columnIds.map((id) => ColumnService.getColumnById(id))
            );
            const sortedColumns = fetchedColumns.sort((a, b) => a.columnIndex - b.columnIndex);

            setColumns(sortedColumns);
        };
        fetchData();
    }, [board.columnIds]);

    const handleDragEnd = async (result: any) => {
        const { source, destination } = result;
        if (!destination || source.index === destination.index) {
            return;
        }
    
        const reorderedColumns = Array.from(columns);
        const [movedColumn] = reorderedColumns.splice(source.index, 1);
        reorderedColumns.splice(destination.index, 0, movedColumn);
    
        setColumns(reorderedColumns);
    
        const updatedColumns = reorderedColumns.map((column, index) => ({
            columnId: column.columnId,
            columnIndex: index,
        }));
    
        try {
            await Promise.all(
                updatedColumns.map((col) =>
                    ColumnService.updateColumn(col.columnId, { columnIndex: col.columnIndex })
                )
            );
            console.log("Column order updated successfully");
        } catch (error) {
            console.error("Error updating column order:", error);
        }
    };
    
    return (
        <div className="p-6 bg-gray-800 text-white min-h-screen">
            <DragDropContext onDragEnd={handleDragEnd}>
                {columns.length > 0 ? (
                    <Droppable droppableId="columns" direction="horizontal">
                        {(provided) => (
                            <div
                                className="flex space-x-4 overflow-x-auto"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {columns.map((column, index) => (
                                    <Draggable
                                        draggableId={column.columnId}
                                        index={index}
                                        key={column.columnId}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="w-64 flex-shrink-0"
                                            >
                                                <ColumnComponent column={column} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ) : (
                    <p>Loading columns...</p>
                )}
            </DragDropContext>
        </div>
    );
};

export default BoardView;
