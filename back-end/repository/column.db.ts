import { Column } from '../model/column';
import { Task } from '../model/task';
import taskDb from './task.db';

const columns: Column[] = [
    new Column("column1-1-1", "To Do", taskDb.getTasks().filter(task => task.getTaskId().endsWith("1-1-1"))),
    new Column("column2-1-1", "In Progress", taskDb.getTasks().filter(task => task.getTaskId().endsWith("2-1-1"))),
    new Column("column3-1-1", "Done", taskDb.getTasks().filter(task => task.getTaskId().endsWith("3-1-1"))),
    new Column("column1-2-1", "To Do", taskDb.getTasks().filter(task => task.getTaskId().endsWith("1-2-1"))),
    new Column("column2-2-1", "In Progress", taskDb.getTasks().filter(task => task.getTaskId().endsWith("2-2-1"))),
    new Column("column3-2-1", "Done", taskDb.getTasks().filter(task => task.getTaskId().endsWith("3-2-1"))),
    new Column("column1-1-2", "To Do", taskDb.getTasks().filter(task => task.getTaskId().endsWith("1-1-2"))),
    new Column("column2-1-2", "In Progress", taskDb.getTasks().filter(task => task.getTaskId().endsWith("2-1-2"))),
    new Column("column3-1-2", "Done", taskDb.getTasks().filter(task => task.getTaskId().endsWith("3-1-2"))),
];

const getColumns = (): Column[] => {
    return columns;
}

const getColumnById = (columnId: string): Column | null => {
    return columns.find(column => column.getColumnId() === columnId) || null;
}

const addColumn = (column: { columnId: string, columnName: string, tasks: Task[]}): void => {
    const newColumn = new Column(column.columnId, column.columnName, column.tasks);
    columns.push(newColumn);
}

const removeColumn = (columnId: string): void => {
    const columnIndex = columns.findIndex(column => column.getColumnId() === columnId);
    if (columnIndex === -1) throw new Error("Column not found");
    columns.splice(columnIndex, 1);
}

const getTasksByColumnId = (columnId: string): Task[] => {
    return columns.find(column => column.getColumnId() === columnId)?.getTasks() || [];
}

const addTaskToColumn = (columnId: string, task: Task): void => {
    const column = columns.find(column => column.getColumnId() === columnId);
    if (!column) throw new Error("Column not found");
    if (column.getTasks().find(t => t.getTaskId() === task.getTaskId())) {
        throw new Error("Task already exists in column");
    }
    column.addTask(task);
}

const removeTaskFromColumn = (columnId: string, taskId: string): void => {
    const column = columns.find(column => column.getColumnId() === columnId);
    if (!column) throw new Error("Column not found");
    if (!column.getTasks().find(t => t.getTaskId() === taskId)) {
        throw new Error("Task not found in column");
    }
    column.removeTask(taskId);
}


export default {
    getColumns,
    getColumnById,
    addColumn,
    removeColumn,
    getTasksByColumnId,
    addTaskToColumn,
    removeTaskFromColumn,
};
