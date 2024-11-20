import taskDB from "../repository/task.db";
import { Task } from "../model/task";
import { TaskInput } from "../types";

const createTask = async ({
    name,
    description,
    dueDate,
    users,
    completed = false
}: TaskInput): Promise<Task> => {
    // Validation logic: Ensure required fields are provided
    if (!name) {
        throw new Error("Task name is required");
    }
    if (!description) {
        throw new Error("Task description is required");
    }
    if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
        throw new Error("Due date must be a valid date");
    }
    if (dueDate < new Date()) {
        throw new Error("Due date cannot be in the past");
    }
    if (!users || users.length === 0) {
        throw new Error("At least one user is required");
    }

    // Call to taskDB to create the task in the database
    const task = await taskDB.createTask(
        name,
        description,
        dueDate,
        completed,
        users
    );

    if (!task) {
        throw new Error("Task creation failed");
    }

    // Return a Task model instance using the created task data
    return Task.from(task);
};


const getAllTasks = async (): Promise<Task[]> => {
    const tasks = await taskDB.getAllTasks();

    if (!tasks || tasks.length === 0) {
        throw new Error("No tasks found");
    }

    // Map the list of tasks to instances of Project
    return tasks.map(Task.from);
};
const getTaskById = async (id: number): Promise<Task> => {
    // Retrieve a task by its id from the database
    const task = await taskDB.getTaskById(id);

    if (!task) {
        throw new Error(`Task with id "${id}" doesn't exist`);
    }

    // Return a Task model instance for the found task
    return Task.from(task);
};

export default {
    createTask,
    getAllTasks,
    getTaskById,
};