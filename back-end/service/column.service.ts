import { Column } from '../model/column';
import { Task } from '../model/task';
import columnDb from '../repository/column.db';

const getAllColumns = () => {
    return columnDb.getColumns();
}

const getColumn = (columnId: string) => {
    return columnDb.getColumnById(columnId);
}

const createColumn = (column: {columnId: string, columnName: string, tasks: Task[]}) => {
    columnDb.addColumn({
        columnId: column.columnId,
        columnName: column.columnName,
        tasks: column.tasks
    });
}

const deleteColumn = (columnId: string) => {
    columnDb.removeColumn(columnId);
}

const addTaskToColumn = (columnId: string, task: Task) => {
    columnDb.addTaskToColumn(columnId, task);
}

const removeTaskFromColumn = (columnId: string, taskId: string) => {
    columnDb.removeTaskFromColumn(columnId, taskId);
}

const getTasksForColumn = (columnId: string) => {
    return columnDb.getTasksByColumnId(columnId);
}

const updateColumn = (columnId: string, column: { columnName?: string, tasks?: Task[]}) => {
    const existingColumn = columnDb.getColumnById(columnId);
    if (!existingColumn) {
        throw new Error('Column not found');
    }
    if (column.columnName) {
        existingColumn.setColumnName(column.columnName);
    }
    if (column.tasks) {
        existingColumn.setTasks(column.tasks);
    }
}

export default {
    getAllColumns,
    getColumn,
    createColumn,
    deleteColumn,
    addTaskToColumn,
    removeTaskFromColumn,
    getTasksForColumn,
    updateColumn,
};
