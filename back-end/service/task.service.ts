import { ta } from 'date-fns/locale';
import { Task } from '../model/task';
import taskDb from '../repository/task.db';
import userDb from '../repository/user.db';
import columnDb from '../repository/column.db';

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
    const task = taskDb.getTaskById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    const columnId = `column${taskId.split('-').splice(1).join('-')}`;
    const column = columnDb.getColumnById(columnId);
    if (!column) {
        throw new Error('Column not found');
    }
    column.removeTask(taskId);
    taskDb.removeTask(taskId);
}

const updateTask = (taskId: string, updatedData: any) => {
    const task = taskDb.getTaskById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    if(updatedData.title) {
        task.setTitle(updatedData.title);
    }
    if(updatedData.description) {
        task.setDescription(updatedData.description);
    }
    if(updatedData.dueDate) {
        task.setDueDate(updatedData.dueDate);
    }
    if (updatedData.assignees) {
        const users = updatedData.assignees.map((assignee: any) => {
            if (typeof assignee === 'string') {
                return userDb.getUserById(assignee);
            } else if (typeof assignee === 'object' && assignee.userId) {
                return userDb.getUserById(assignee.userId);
            }
            return null;
        }).filter((user:any) => user !== null);
        task.setAssignees(users);
    }
}

export default {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
};
