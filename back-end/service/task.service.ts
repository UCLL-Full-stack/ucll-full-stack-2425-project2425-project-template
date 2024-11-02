import { Task } from '../model/task';
import taskDb from '../repository/task.db';

const getAllTasks = () => {
    return taskDb.getTasks();
}

const getTask = (taskId: string) => {
    return taskDb.getTaskById(taskId);
}

const createTask = (task: Task) => {
    taskDb.addTask(task);
}

const deleteTask = (taskId: string) => {
    taskDb.removeTask(taskId);
}

export default {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
};
