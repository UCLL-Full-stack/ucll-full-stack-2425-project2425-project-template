import { Task } from '../model/task';
import taskDb from '../repository/task.db';

const getAllTasks = (): Task[] => {
    return taskDb.getAllTasks();
};

const getTaskById = (id: number): Task => {
    const task = taskDb.getTaskById({id});
    if (!task) {
        throw new Error(`Task with id ${id} does not exist.`);
    }
    return task;
}

export default {
    getAllTasks,
    getTaskById,
};