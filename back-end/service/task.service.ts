import taskDb from "../repository/task.db";
import { Task } from "../model/task";
import { CreateTaskInput, UpdateTaskInput } from "../types";

const getTasksOfColumn = async (columnId: string): Promise<Task[]> => {
    return await taskDb.getTasksOfColumn(columnId);
}

const getTaskById = async (taskId: string): Promise<Task> => {
    return await taskDb.getTaskById(taskId);
}

const addTask = async (taskData: CreateTaskInput): Promise<Task> => {
    return await taskDb.addTask(taskData);
}

const updateTask = async (taskId: string, taskData: UpdateTaskInput): Promise<Task> => {
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