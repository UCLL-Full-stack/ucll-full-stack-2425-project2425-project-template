import { Task } from '../model/task';
import userDb from './user.db';

const tasks: Task[] = [
    new Task("task1-3-1-1", "Task 1", "Description for Task 1", new Date(), [userDb.getUserById("user1")!, userDb.getUserById("user3")!]),
    new Task("task2-2-1-1", "Task 2", "Description for Task 2", new Date(), [userDb.getUserById("user1")!]),
    new Task("task3-1-1-1", "Task 3", "Description for Task 3", new Date(), []),
    new Task("task1-1-2-1", "Task 1", "Description for Task 1", new Date(), [userDb.getUserById("user3")!]),
    new Task("task2-1-2-1", "Task 2", "Description for Task 2", new Date(), [userDb.getUserById("user1")!]),
    new Task("task1-1-1-2", "Task 1", "Description for Task 1", new Date(), []),
    new Task("task2-2-1-2", "Task 2", "Description for Task 2", new Date(), [userDb.getUserById("user2")!]),
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
