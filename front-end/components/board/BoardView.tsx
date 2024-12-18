import ColumnService from "@/services/ColumnService";
import { Board, Column } from "@/types";
import { useEffect, useState } from "react";
import ColumnComponent from "./Column";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BoardService from "@/services/BoardService";
import TaskService from "@/services/TaskService";

interface BoardViewProps {
    board: Board;
    onAddColumn: (columnName: string) => void;
    onDeleteColumn: (columnId: string) => void;
}

const BoardView: React.FC<BoardViewProps> = ({ board, onAddColumn, onDeleteColumn }) => {
    const [columns, setColumns] = useState<Column[]>([]);
    const [addingColumn, setAddingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");

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
        const { source, destination, type } = result;

        if (!destination) return;

        if (type === "COLUMN") {
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
        } else if (type === "TASK") {
            const sourceColumn = columns.find((col) => col.columnId === source.droppableId);
            const destinationColumn = columns.find(
                (col) => col.columnId === destination.droppableId
            );
            if (!sourceColumn || !destinationColumn) return;

            const sourceTasks = [...sourceColumn.taskIds];
            let destinationTasks = [...destinationColumn.taskIds];
            if (sourceColumn.columnId === destinationColumn.columnId) {
                const [movedTask] = sourceTasks.splice(source.index, 1);
                sourceTasks.splice(destination.index, 0, movedTask);
                destinationTasks = sourceTasks;
            } else {
                const [movedTask] = sourceTasks.splice(source.index, 1);
                destinationTasks.splice(destination.index, 0, movedTask);
            }
            const updatedColumns = columns.map((col) => {
                if (col.columnId === sourceColumn.columnId) {
                    return { ...col, taskIds: sourceTasks };
                }
                if (col.columnId === destinationColumn.columnId) {
                    return { ...col, taskIds: destinationTasks };
                }
                return col;
            });
        
            setColumns(updatedColumns);
        
            try {
                const updateTasksPromises: Promise<any>[] = [];
                destinationTasks.forEach((taskId, index) => {
                    updateTasksPromises.push(
                        TaskService.updateTask(taskId, {
                            taskIndex: index,
                            columnId: destinationColumn.columnId,
                        })
                    );
                });
                if (sourceColumn !== destinationColumn) {
                    sourceTasks.forEach((taskId, index) => {
                        updateTasksPromises.push(
                            TaskService.updateTask(taskId, {
                                taskIndex: index,
                                columnId: sourceColumn.columnId,
                            })
                        );
                    });
                }
        
                await Promise.all(updateTasksPromises);
                console.log("Task order updated successfully");
            } catch (error) {
                console.error("Error updating task order:", error);
            }
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
                    <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
                        {(provided) => (
                            <div
                                className="flex space-x-4 overflow-x-auto items-start"
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
                                                <ColumnComponent
                                                    column={column}
                                                    onDelete={onDeleteColumn}
                                                />
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
                                        className="w-64 flex-shrink-0 border-2 border-dashed border-gray-500 text-gray-500 rounded-md flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors h-20"
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
