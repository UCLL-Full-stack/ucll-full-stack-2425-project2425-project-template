import { ta } from 'date-fns/locale';
import { Column } from '../model/column';
import { Task } from '../model/task';
import boardDb from '../repository/board.db';
import columnDb from '../repository/column.db';
import taskDb from '../repository/task.db';
import { User } from '../model/user';
import { validateColumn, validateTask } from '../util/validators';

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
    const column = columnDb.getColumnById(columnId);
    if (!column) {
        throw new Error('Column not found');
    }
    const tasks = column.getTasks();
    if (tasks.length > 0) {
        tasks.forEach(task => taskDb.removeTask(task.getTaskId()));
    }
    columnDb.removeColumn(columnId);
    // in actual production, we would have another property that is essentially the path, which is the combination of the parent board id and column id, or use an actual database table to store the relationships between boards and columns
    // We are basically brute forcing this lmao.
    const boardId = `board${columnId.split('-').slice(1).join('-')}`;
    const board = boardDb.getBoardById(boardId)!;
    board.removeColumn(columnId);
}

const addTaskToColumn = (columnId: string, task: any) => {
    const column = columnDb.getColumnById(columnId);
    if (!column) {
        throw new Error('Column not found');
    }
    const errors = validateTask(task);
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    const boardId = `board${columnId.split('-').slice(1).join('-')}`;
    const existingTasks = boardDb.getAllTasksForBoard(boardId);
    const taskNumber = existingTasks.length + 1;
    const newTask = new Task(`task${taskNumber}-${columnId.slice(6)}`, task.title, task.description, new Date(task.dueDate), [] as User[]);
    taskDb.addTask(newTask);
    columnDb.addTaskToColumn(columnId, newTask);
}

const removeTaskFromColumn = (columnId: string, taskId: string) => {
    columnDb.removeTaskFromColumn(columnId, taskId);
}

const getTasksForColumn = (columnId: string) => {
    return columnDb.getTasksByColumnId(columnId);
}

const updateColumn = (columnId: string, column: any) => {
    const errors = validateColumn(column);
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
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
