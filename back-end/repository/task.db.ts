import { Task } from '../model/task';
import userDb from './user.db';

const tasks: Task[] = [
];

const getTasks = (): Task[] => {
    return tasks;
}

const getTaskById = (taskId: string): Task | null => {
    return tasks.find(task => task.getTaskId() === taskId) || null;
}

const addTask = (task: Task): void => {
    tasks.push(task);
}

const removeTask = (taskId: string): void => {
    const taskIndex = tasks.findIndex(task => task.getTaskId() === taskId);
    if (taskIndex === -1) throw new Error("Task not found");
    tasks.splice(taskIndex, 1);
}

export default {
    getTasks,
    getTaskById,
    addTask,
    removeTask,
};
