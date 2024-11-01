import { Task } from '../model/task';

const tasks: Task[] = [];

const getAllTasks = (): Task[] => {
    return tasks;
};

const getTaskById = ({ id }: { id: number }): Task | null => {
    const task = tasks.find((task) => task.getId() === id);
    if (!task) {
        return null;
    }
    return task; 
}

export default {
    getAllTasks,
    getTaskById,
};
