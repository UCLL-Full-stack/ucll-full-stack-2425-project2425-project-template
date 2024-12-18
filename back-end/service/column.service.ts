import columnDb from "../repository/column.db";
import { Column } from "../model/column";

const getColumnsOfBoard = async (boardId: string): Promise<Column[]> => {
    return await columnDb.getColumnsOfBoard(boardId);
}

const getColumnById = async (columnId: string): Promise<Column> => {
    return await columnDb.getColumnById(columnId);
}

const addColumn = async (columnData: { columnName: string; columnIndex: number; boardId: string; taskIds?: string[] }): Promise<Column> => {
    return await columnDb.addColumn(columnData);
}

const updateColumn = async (columnId: string, columnData: { columnName?: string; columnIndex?: number; taskIds?: string[] }): Promise<Column> => {
    return await columnDb.updateColumn(columnId, columnData);
}

const deleteColumn = async (columnId: string): Promise<void> => {
    return await columnDb.deleteColumn(columnId);
}

const addTaskToColumn = async (
    columnId: string,
    task: { taskId: string; title: string; description?: string }
): Promise<Column> => {
    const column = await getColumnById(columnId);
    if (!column) {
        throw new Error("Column not found");
    }

    const updatedTaskIds = column.getTaskIds() || [];
    updatedTaskIds.push(task.taskId);
    column.setTaskIds(updatedTaskIds);

    return await columnDb.updateColumn(columnId, { taskIds: column.getTaskIds() });
};


export default {
    getColumnsOfBoard,
    getColumnById,
    addColumn,
    updateColumn,
    deleteColumn,
    addTaskToColumn
}