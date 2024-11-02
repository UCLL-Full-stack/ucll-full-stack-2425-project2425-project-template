import { Column } from '../model/column';
import { Task } from '../model/task';
import columnDb from '../repository/column.db';

const getAllColumns = () => {
    return columnDb.getColumns();
}

const getColumn = (columnId: string) => {
    return columnDb.getColumnById(columnId);
}

const createColumn = (column: Column) => {
    columnDb.addColumn(column);
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

export default {
    getAllColumns,
    getColumn,
    createColumn,
    deleteColumn,
    addTaskToColumn,
    removeTaskFromColumn,
    getTasksForColumn,
};
