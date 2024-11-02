import { Column } from '../model/column';
import { Task } from '../model/task';
import columnDb from '../repository/column.db';
import taskDb from '../repository/task.db';

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

const updateColumn = (columnId: string, column: any) => {
    const existingColumn = columnDb.getColumnById(columnId);
    if (!existingColumn) {
        throw new Error('Column not found');
    }
    if (column.columnName) {
        existingColumn.setColumnName(column.columnName);
    }
    if (column.tasks) {
        const updatedTasks = column.tasks.map((task: any) => {
            const taskId = typeof task === 'string' ? task : task.taskId;
            const taskExists = taskDb.getTaskById(taskId);
            if (!taskExists) {
                throw new Error(`Task with ID ${taskId} does not exist.`);
            }
            // Note, this is a unconventional way to update the task ID to match the new column ID. If this were not a mock project, the ids would be actually unique hence would not need to be updated
            // But since the the mock ids are not unique and are using the column id, board id and guild id to identify themselves, changing column requires changing the id as well...
            const newTaskId = `${taskId.split('-')[0]}-${columnId.slice(6)}`
            taskExists.setTaskId(newTaskId);
            return taskExists;
        });
        existingColumn.setTasks(updatedTasks);
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
