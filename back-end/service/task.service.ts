import taskDb from "../repository/task.db";
import { Task } from "../model/task";

const getTasksOfColumn = async (columnId: string): Promise<Task[]> => {
    return await taskDb.getTasksOfColumn(columnId);
}

const getTaskById = async (taskId: string): Promise<Task> => {
    return await taskDb.getTaskById(taskId);
}

const addTask = async (taskData: {
    title: string;
    description: string;
    dueDate: Date;
    assigneeIds?: string[];
    columnId: string;
}): Promise<Task> => {
    return await taskDb.addTask(taskData);
}

const updateTask = async (taskId: string, taskData: {
    title?: string;
    description?: string;
    dueDate?: Date;
    assigneeIds?: string[];
    columnId?: string;
}): Promise<Task> => {
    return await taskDb.updateTask(taskId, taskData);
}

const deleteTask = async (taskId: string): Promise<void> => {
    return await taskDb.deleteTask(taskId);
}

export default {
    getTasksOfColumn,
    getTaskById,
    addTask,
    updateTask,
    deleteTask
}