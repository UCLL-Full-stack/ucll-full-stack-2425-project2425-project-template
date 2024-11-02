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

const updateTask = (taskId: string, updatedData: Partial<Task>) => {
    const task = taskDb.getTaskById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    
    const updates = updatedData as Task;

    if (updates.getTitle() !== undefined) {
        task.setTitle(updates.getTitle());
    }
    if (updates.getDescription() !== undefined) {
        task.setDescription(updates.getDescription());
    }
    if (updates.getDueDate() !== undefined) {
        task.setDueDate(updates.getDueDate());
    }
    if (updates.getAssignees() !== undefined) {
        task.setAssignees(updates.getAssignees());
    }
}

export default {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
};
