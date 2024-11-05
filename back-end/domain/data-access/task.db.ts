import { Task } from "../model/task";
import { User } from "../model/user";
import userDb from "./user.db";

const users: User[] = userDb.getAllUsers();

let current_ID = 1;

const tasks: Task[] = [
    new Task({ task_Id: current_ID++, name: "Task 1", description: "Description 1", due_date: new Date("2024-10-21T00:00:00Z"), users: [users[0]], completed: false }),
    new Task({ task_Id: current_ID++, name: "Task 2", description: "Description 2", due_date: new Date("2024-11-20T00:00:00Z"), users: [users[1]], completed: false }),
    new Task({ task_Id: current_ID++, name: "Task 3", description: "Description 3", due_date: new Date("2024-12-25T00:00:00Z"), users: [users[0]], completed: true }),
    new Task({ task_Id: current_ID++, name: "Task 4", description: "Description 4", due_date: new Date("2024-09-28T00:00:00Z"), users: [users[1], users[0]], completed: true }),
    new Task({ task_Id: current_ID++, name: "Task 5", description: "Description 5", due_date: new Date("2024-08-29T00:00:00Z"), users: [users[0]], completed: false }),
]

const createTask = ({ name, description, due_date, users }: Task): Task => {
    const task = new Task({ task_Id: Date.now(), name, description, due_date, users: [], completed: false });
    tasks.push(task);
    return task;
};

const getAllTasks = (): Task[] => tasks;

const getTaskById = (task_Id: number): Task | undefined => {
    return tasks.find(task => task.task_Id === task_Id);
};

export default {
    createTask,
    getAllTasks,
    getTaskById
};