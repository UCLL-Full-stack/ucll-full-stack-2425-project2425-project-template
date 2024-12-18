import columnDb from "../repository/column.db";
import { Column } from "../model/column";
import { CreateColumnInput, UpdateColumnInput } from "../types";
import boardDb from "../repository/board.db";

const getColumnsOfBoard = async (boardId: string): Promise<Column[]> => {
    return await columnDb.getColumnsOfBoard(boardId);
}

const getColumnById = async (columnId: string): Promise<Column> => {
    return await columnDb.getColumnById(columnId);
}

const addColumn = async (columnData: CreateColumnInput): Promise<Column> => {
    const column = await columnDb.addColumn(columnData);
    const board = await boardDb.getBoardById(columnData.boardId);
    await boardDb.updateBoard(columnData.boardId, { columnIds: [...board.getColumnIds(), column.getColumnId()] });
    return column;
}

const updateColumn = async (columnId: string, columnData: UpdateColumnInput): Promise<Column> => {
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