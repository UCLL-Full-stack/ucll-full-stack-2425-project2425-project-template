import { Task } from '../model/task';
import database from './database';

const getAllTasks = async (): Promise<Task[]> => {
    try {
        const taskPrisma = await database.task.findMany();
        return taskPrisma.map((taskPrisma) => Task.from(taskPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getTaskById = async ({ id }: { id: number }): Promise<Task> => {
    try {
        const taskPrisma = await database.task.findUnique({
            where: {
                id
            }
        });
        if (!taskPrisma) {
            throw new Error(`Task with id ${id} does not exist.`);
        }
        return Task.from(taskPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default {
    getAllTasks,
    getTaskById,
};
