import taskDB from "../repository/task.db";
import { Task } from "../model/task";
import { TaskInput } from "../types";

const createTask = async ({
    name,
    description,
    dueDate,
    users,  // Assuming users are passed in
    completed = false  // Optional, defaults to false
}: TaskInput): Promise<Task> => {
    // Validation logic: Ensure required fields are provided
    if (!name) {
        throw new Error("Task name is required");
    }
    if (!description) {
        throw new Error("Task description is required");
    }
    if (!(dueDate instanceof Date)) {
        throw new Error("Due date must be a valid date");
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
    // Retrieve all tasks from the database
    const tasks = await taskDB.getAllTasks();

    // Map the raw data to Task model instances
    return tasks.map(Task.from);
};

const getTaskByTitle = async (title: string): Promise<Task> => {
    // Retrieve a task by its title from the database
    const task = await taskDB.getTaskByTitle(title);

    if (!task) {
        throw new Error(`Task with title "${title}" doesn't exist`);
    }

    // Return a Task model instance for the found task
    return Task.from(task);
};

export default {
    createTask,
    getAllTasks,
    getTaskByTitle,
};
