import ColumnService from "@/services/ColumnService";
import { Board, Column } from "@/types";
import { useEffect, useState } from "react";
import ColumnComponent from "./Column";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTranslation } from 'react-i18next';

interface BoardViewProps {
    board: Board;
    onAddColumn: (columnName: string) => void;
    onDeleteColumn: (columnId: string) => void;
}

const BoardView: React.FC<BoardViewProps> = ({ board, onAddColumn, onDeleteColumn }) => {
    const { t } = useTranslation(['common']);
    const [columns, setColumns] = useState<Column[]>([]);
    const [addingColumn, setAddingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");

        useEffect(() => {
        const fetchData = async () => {
            if (!board?.columnIds?.length) {
                setColumns([]);
                return;
            }
    
            try {
                const fetchedColumns = await Promise.all(
                    board.columnIds.map(async (id) => {
                        try {
                            return await ColumnService.getColumnById(id);
                        } catch (error) {
                            console.error(`Error fetching column ${id}:`, error);
                            return null;
                        }
                    })
                );
    
                const validColumns = fetchedColumns.filter(column => column !== null);
                const sortedColumns = validColumns.sort((a, b) => a.columnIndex - b.columnIndex);
                setColumns(sortedColumns);
            } catch (error) {
                console.error('Error in fetchData:', error);
                setColumns([]);
            }
        };
    
        fetchData();
    }, [board?.columnIds]);

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

    const handleAddColumn = async () => {
        if (newColumnName.trim() !== "") {
            onAddColumn(newColumnName.trim());
        }
        setAddingColumn(false);
        setNewColumnName("");
    };

    const handleInputBlur = () => {
        if (newColumnName.trim() !== "") {
            handleAddColumn();
        } else {
            setAddingColumn(false);
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
                                                <ColumnComponent column={column} onDelete={(columnId:string) => onDeleteColumn(columnId)}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {addingColumn ? (
                                    <div className="w-64 flex-shrink-0 border-2 border-dashed border-blue-500 rounded-md p-4">
                                        <input
                                            type="text"
                                            value={newColumnName}
                                            onChange={(e) => setNewColumnName(e.target.value)}
                                            onBlur={handleInputBlur}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleAddColumn();
                                                }
                                            }}
                                            autoFocus
                                            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                                            placeholder="Enter column name"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setAddingColumn(true)}
                                        className="w-64 flex-shrink-0 border-2 border-dashed border-gray-500 text-gray-500 rounded-md flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors"
                                    >
                                        + Add Column
                                    </button>
                                )}
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