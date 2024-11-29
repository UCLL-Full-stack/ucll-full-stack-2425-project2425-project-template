import { de } from 'date-fns/locale';
import { Task } from '../model/task';
import database from './database';
import userDb from './user.db';

const getAllTasks = async (): Promise<Task[]> => {
    try {
        const tasksPrisma = await database.task.findMany({
            include: {
                assignees: { select: { userId: true } },
                column: { select: { columnId: true } },
            },
        });
        return tasksPrisma.map((taskPrisma) => {
            const assigneeIds = taskPrisma.assignees?.map(assignee => assignee.userId) || [];
            const task = Task.from(taskPrisma);
            task.setAssigneeIds(assigneeIds);
            task.setColumnId(taskPrisma.column.columnId);
            return task;
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTaskById = async (taskId: string): Promise<Task> => {
    const taskPrisma = await database.task.findUnique({
        where: { taskId },
        include: {
            assignees: { select: { userId: true } },
            column: { select: { columnId: true } },
        },
    });

    if (!taskPrisma) {
        throw new Error("Task not found");
    }

    const assigneeIds = taskPrisma.assignees?.map((assignee) => assignee.userId) || [];
    const task = Task.from(taskPrisma);
    task.setAssigneeIds(assigneeIds);
    task.setColumnId(taskPrisma.column.columnId);
    return task;
}

const addTask = async (taskData: {
    title: string;
    description: string;
    dueDate: Date;
    assigneeIds?: string[];
    columnId: string;
}): Promise<Task> => {
    const { title, description, dueDate, assigneeIds = [], columnId } = taskData;
    const taskPrisma = await database.task.create({
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
            assignees: {
                connect: assigneeIds.map(userId => ({ userId })),
            },
            columnId: columnId,
        },
        include: {
            assignees: { select: { userId: true } },
            column: { select: { columnId: true } },
        },
    });

    const assigneeIdsResult = taskPrisma.assignees.map(assignee => assignee.userId);
    const task = Task.from(taskPrisma);
    task.setAssigneeIds(assigneeIdsResult);
    task.setColumnId(taskPrisma.columnId);
    return task;
}

const updateTask = async (taskId: string, taskData: {
    title?: string;
    description?: string;
    dueDate?: Date;
    assigneeIds?: string[];
    columnId?: string;
}): Promise<Task> => {
    try {
        const { title, description, dueDate, assigneeIds, columnId } = taskData;
        const data: any = {};
        if (title !== undefined) {
            data.title = title;
        }
        if (description !== undefined) {
            data.description = description;
        }
        if (dueDate !== undefined) {
            data.dueDate = dueDate;
        }
        if (assigneeIds !== undefined) {
            data.assignees = {
                set: assigneeIds.map(userId => ({ userId })),
            };
        }
        if (columnId !== undefined) {
            data.columnId = columnId;
        }

        const taskPrisma = await database.task.update({
            where: { taskId },
            data,
            include: {
                assignees: { select: { userId: true } },
                column: { select: { columnId: true } },
            },
        });

        const assigneeIdsResult = taskPrisma.assignees.map(assignee => assignee.userId);
        const task = Task.from(taskPrisma);
        task.setAssigneeIds(assigneeIdsResult);
        task.setColumnId(taskPrisma.columnId);
        return task;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const deleteTask = async (taskId: string): Promise<void> => {
    const task = await database.task.findUnique({ where: { taskId } });
    if (!task) {
        throw new Error("Task not found");
    }
    await database.task.delete({ where: { taskId } });
}

const getTasksOfColumn = async (columnId: string): Promise<Task[]> => {
    try {
        const tasksPrisma = await database.task.findMany({
            where: { columnId },
            include: {
                assignees: { select: { userId: true } },
                column: { select: { columnId: true } },
            },
        });
        return tasksPrisma.map((taskPrisma) => {
            const assigneeIds = taskPrisma.assignees?.map(assignee => assignee.userId) || [];
            const task = Task.from(taskPrisma);
            task.setAssigneeIds(assigneeIds);
            task.setColumnId(taskPrisma.column.columnId);
            return task;
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    getTasksOfColumn
};
