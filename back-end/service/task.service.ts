import { Task } from '../model/task';
import taskDb from '../repository/task.db';

const getAllTasks = async (): Promise<Task[]> => {
    return await taskDb.getAllTasks();
};

const getTaskById = async (id: number): Promise<Task> => {
    const task = await taskDb.getTaskById({id});
    return task;
}

export default {
    getAllTasks,
    getTaskById,
};